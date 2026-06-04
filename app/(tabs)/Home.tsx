import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'; // ✅ الاستيراد الحديث والصحيح بدون تحذيرات
import { Alert, Button, Image, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { db } from '../../components/firebase';
import Header from '../../scripts/Header'; // المسار الخاص بك كما هو مفضل لديك
import styles from '../../scripts/styles'; 

const MainScreen = () => {
  const [incubationCycles, setIncubationCycles] = useState<any[]>([]);
  const [currentCycleIndex, setCurrentCycleIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [remainingEggs, setRemainingEggs] = useState('');
  const [modalVisible, setModalVisible] = useState(false); 
  const [imageModalVisible, setImageModalVisible] = useState(false); 
  const [markedDates, setMarkedDates] = useState<Record<string, any>>({});
  const [temperature, setTemperature] = useState('N/A');
  const [humidity, setHumidity] = useState('N/A');

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'NuevaEcl'),
      (snapshot) => {
        const cycles = snapshot.docs.map((doc) => {
          const data = doc.data();
          if (!data.incubationDate) return null;

          const startIncubationDate = new Date(data.incubationDate);
          if (isNaN(startIncubationDate.getTime())) return null;

          const dayAfter21 = new Date(startIncubationDate);
          dayAfter21.setDate(startIncubationDate.getDate() + 21); 

          const today = new Date();
          if (today > dayAfter21) {
            return null; 
          }

          return { id: doc.id, ...data };
        }).filter(cycle => cycle !== null);

        setIncubationCycles(cycles);
      },
      (error) => {
        console.error('Error fetching incubation cycles:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  const currentCycle = incubationCycles[currentCycleIndex] || {};

  const calculateDayNumber = (startDate: any) => {
    if (!startDate) return 0;
    const start = new Date(startDate);
    if (isNaN(start.getTime())) return 0;
    
    const today = new Date();
    
    today.setHours(0,0,0,0);
    start.setHours(0,0,0,0);
    
    const diffTime = today.getTime() - start.getTime();
    return Math.floor(diffTime / (1000 * 3600 * 24)) + 1;
  };

  const getEggImage = (incubationDate: any) => {
    const dayNumber = calculateDayNumber(incubationDate);
    if (dayNumber <= 3) {
      return require('../../assets/images/ouevos1.jpg');
    } else {
      return require('../../assets/images/ouevos2.jpg');
    }
  };

  const getEggTurningIcon = (incubationDate: any) => {
    const dayNumber = calculateDayNumber(incubationDate);
    if (dayNumber >= 4 && dayNumber <= 18) {
      return require('../../assets/images/Volteando.png');
    } else {
      return require('../../assets/images/nonVolteando.png');
    }
  };

  const generateMarkedDates = (startDate: any, eggCount: any) => {
    const marked: any = {};
    if (!startDate) return marked;

    const start = new Date(startDate);
    if (isNaN(start.getTime())) return marked;

    const hatchingDate = new Date(start);
    hatchingDate.setDate(hatchingDate.getDate() + 21);
    const todayStr = new Date().toISOString().split('T')[0];

    let currentDate = new Date(start);
    const maxDate = new Date(todayStr) > hatchingDate ? hatchingDate : new Date(todayStr);

    while (currentDate <= maxDate) {
      const dateString = currentDate.toISOString().split('T')[0];
      marked[dateString] = {
        color: eggCount?.[dateString] ? 'rgba(0, 255, 127, 0.5)' : 'rgba(255, 182, 193, 0.5)',
        textColor: 'black',
      };
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const startStr = start.toISOString().split('T')[0];
    marked[startStr] = { startingDay: true, color: 'rgba(0, 123, 255, 0.5)', textColor: 'white' };
    
    const hatchStr = hatchingDate.toISOString().split('T')[0];
    marked[hatchStr] = {
      marked: true,
      customStyles: {
        container: { backgroundColor: 'transparent', borderRadius: 50, borderColor: 'red', borderWidth: 2 },
        text: { color: 'red', fontWeight: 'bold' },
      },
    };

    return marked;
  };

  useEffect(() => {
    if (!currentCycle || !currentCycle.incubationDate) {
      setMarkedDates({});
      setTemperature('N/A');
      setHumidity('N/A');
      return;
    }

    setMarkedDates(generateMarkedDates(currentCycle.incubationDate, currentCycle.eggCount));
    const dayNumber = calculateDayNumber(currentCycle.incubationDate);
    
    if (dayNumber >= 1 && dayNumber <= 18) {
      setTemperature('37.5°C');
      setHumidity('65%');
    } else if (dayNumber <= 21) {
      setTemperature('38.5°C');
      setHumidity('75%');
    } else {
      setTemperature('N/A');
      setHumidity('N/A');
    }
  }, [currentCycle]);

  const handleDayPress = (day: any) => {
    if (!day || !day.dateString) return;

    const selectedDayData = markedDates[day.dateString];

    if (
      !selectedDayData || 
      !selectedDayData.color || 
      typeof selectedDayData.color !== 'string' ||
      !selectedDayData.color.replace(/\s+/g, '').includes('255,182,193')
    ) {
      Alert.alert('Invalid Day', 'No valid incubation data for this day.');
      return;
    }

    setSelectedDate(day.dateString);
    setModalVisible(true); 
  };

  const handleSaveEggCount = async () => {
    if (!selectedDate) return;
    try {
      const docRef = doc(db, 'NuevaEcl', currentCycle.id);
      const eggCount = { ...(currentCycle.eggCount || {}) };
      eggCount[selectedDate] = parseInt(remainingEggs) || 0;
      await updateDoc(docRef, { eggCount });
      Alert.alert('Success', 'Egg count updated successfully.');
    } catch (error) {
      console.error('Error updating egg count:', error);
      Alert.alert('Error', 'Failed to update egg count.');
    } finally {
      setModalVisible(false); 
      setRemainingEggs('');
    }
  };

  const currentDayNum = calculateDayNumber(currentCycle.incubationDate);
  const daysLeft = currentCycle.incubationDate ? 21 - currentDayNum : 'N/A';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* الهيدر مستقل بذاته في الأعلى تماماً */}
      <Header />
      
      {/* محتوى الشاشة الرئيسي يبدأ بانتظام من هنا */}
      <View style={[styles.container, { paddingHorizontal: 15 }]}>
        <Text style={[styles.title, { marginTop: 15, textAlign: 'center' }]}>
          {currentCycle.type || 'No Active Cycle'}
        </Text>
        
        {/* قسم المؤشرات الأفقية */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 15 }}>
          <View style={styles.indicator}>
            <Image source={require('../../assets/images/humedite.png')} style={{ width: 24, height: 24, resizeMode: 'contain' }} />
            <Text style={styles.value}>{humidity}</Text>
          </View>
          
          <View style={styles.eggContainer}>
            <Image source={currentCycle.incubationDate ? getEggImage(currentCycle.incubationDate) : require('../../assets/images/pollo.png')} style={styles.eggImage} />
            <View style={styles.eggImageContainer}>
              <Image source={getEggTurningIcon(currentCycle.incubationDate)} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
            </View>
            <Text style={styles.remainingDays}>
              {daysLeft}
            </Text>
          </View>
          
          <View style={styles.indicator}>
            <Image source={require('../../assets/images/temperatura.png')} style={{ width: 24, height: 24, resizeMode: 'contain' }} />
            <Text style={styles.value}>{temperature}</Text>
          </View>
        </View>

        <Calendar
          style={{ height: 280, borderRadius: 10 }}
          markingType="period"
          markedDates={markedDates}
          onDayPress={handleDayPress}
          theme={{
            selectedDayBackgroundColor: 'rgba(0, 123, 255, 0.7)',
            todayTextColor: '#007BFF',
            arrowColor: 'blue',
          }}
        />

        <View style={styles.iconButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              if (currentCycleIndex > 0) {
                setCurrentCycleIndex((prevIndex) => prevIndex - 1);
              }
            }}
          >
            <Image source={require('../../assets/images/decrease.png')} style={styles.iconButton} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.huevosButton}
            onPress={() => setImageModalVisible(true)} 
          >
            <Text style={styles.huevosButtonText}>Huevos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (currentCycleIndex < incubationCycles.length - 1) {
                setCurrentCycleIndex((prevIndex) => prevIndex + 1);
              }
            }}
          >
            <Image source={require('../../assets/images/increase.png')} style={styles.iconButton} />
          </TouchableOpacity>
        </View>
      </View>

      {/* الـ Modals المنفصلة */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.menuContainer}>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>Enter remaining eggs for {selectedDate}:</Text>
            <TextInput
              style={{ borderBottomWidth: 1, width: '100%', marginBottom: 15, padding: 5, textAlign: 'center' }}
              keyboardType="numeric"
              value={remainingEggs}
              onChangeText={setRemainingEggs}
            />
            <Button title="Save" onPress={handleSaveEggCount} />
            <TouchableOpacity
              style={{ marginTop: 15, padding: 10 }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: 'red', fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={imageModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setImageModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.menuContainer}>
            <Image
              source={currentCycle.incubationDate ? getEggImage(currentCycle.incubationDate) : require('../../assets/images/ouevos1.jpg')}
              style={{ width: 250, height: 250, resizeMode: 'contain', marginBottom: 15 }}
            />
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => setImageModalVisible(false)}
            >
              <Text style={{ color: 'red', fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MainScreen;