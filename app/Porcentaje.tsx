import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../components/firebase';
import { useLocalSearchParams } from 'expo-router'; // ✅ استخدام الموجه الصحيح لـ Expo Router
import styles from '../scripts/styles';

const PorcentajeScreen = () => {
  // ✅ طريقة جلب الـ Params الصحيحة والآمنة في Expo Router
  const params = useLocalSearchParams();
  const logId = typeof params?.logId === 'string' ? params.logId : '';

  const [loading, setLoading] = useState(true);
  const [logData, setLogData] = useState<any>(null);
  const [hatchPercentage, setHatchPercentage] = useState(0);
  const [remainingEggPercentage, setRemainingEggPercentage] = useState(0);

  useEffect(() => {
    if (!logId) {
      Alert.alert('Error', 'ID de registro no válido.');
      setLoading(false);
      return;
    }

    const fetchLogData = async () => {
      try {
        const docRef = doc(db, 'NuevaEcl', logId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setLogData(data);

          const eggPrimerdia = data.eggPrimerdia; 
          const eggCounts = data.eggCount || {}; 

          const eggCountValues = Object.values(eggCounts);
          const lastEggCount = eggCountValues.length > 0 ? Number(eggCountValues[eggCountValues.length - 1]) : 0; 

          if (eggPrimerdia && lastEggCount) {
            const remainingEgg = (lastEggCount / eggPrimerdia) * 100;
            setRemainingEggPercentage(remainingEgg); 

            const hatch = ((eggPrimerdia - lastEggCount) / eggPrimerdia) * 100;
            setHatchPercentage(hatch); 
          }
        } else {
          Alert.alert('Error', 'Registro no encontrado.');
        }
      } catch (error) {
        Alert.alert('Error', 'Hubو un problema al cargar los datos.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogData();
  }, [logId]);

  // ✅ حماية بيانات الرسم البياني بالأعمدة: نضع قيم افتراضية [0] في حال كانت البيانات فارغة لتجنب الانهيار
  const barLabels = Object.keys(logData?.eggCount || {}).length > 0 ? Object.keys(logData?.eggCount || {}) : ['No Data'];
  const barValues = Object.values(logData?.eggCount || {}).length > 0 ? Object.values(logData?.eggCount || {}).map(v => Number(v)) : [0];

  const barData = {
    labels: barLabels,
    datasets: [{ data: barValues }],
  };

  // Données pour le graphique circulaire
  const pieData = [
    {
      name: "Hatch %",
      population: hatchPercentage || 0,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Remaining Eggs",
      population: remainingEggPercentage || 0,
      color: "blue",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    }
  ];

  const screenWidth = Dimensions.get('window').width;
  const chartConfig = {
    backgroundGradientFrom: '#F6F8FB',
    backgroundGradientTo: '#F6F8FB',
    color: () => `hsl(266, 91.60%, 46.50%)`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007ACC" />
      ) : (
        <>
          <Text style={styles.title}>Tipo: {logData?.type || 'N/A'}</Text>
          <Text style={styles.title}>
            {logData?.incubationDate ? new Date(logData.incubationDate).toLocaleDateString() : 'N/A'}
          </Text>
          
          {/* Graphique circulaire */}
          <PieChart
            data={pieData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />

          {/* Graphique à barres 
          <BarChart
            data={barData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />*/}
        </>
      )}
    </View>
  );
};

export default PorcentajeScreen;