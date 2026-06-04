import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { db } from '../../components/firebase';
import Header from '../../scripts/Header'; 
import styles from '../../scripts/styles';

const TiendaScreen = () => {
  const router = useRouter(); 
  const [salesData, setSalesData] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true); 

  const noImagePath = require('../../assets/images/no-image.jpg');
  const addIcon = require('../../assets/images/añadir.png'); 

  const fetchSalesData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Tienda')); 
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); 
      setSalesData(data); 
    } catch (error) {
      console.error('Error al obtener los datos de ventas:', error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {}
      <Header />

      <View style={[styles.container, { flex: 1, paddingHorizontal: 10 }]}>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#6200EE" />
            <Text style={[styles.emptyText, { marginTop: 10 }]}>Cargando datos...</Text>
          </View>
        ) : salesData.length === 0 ? (
          <Text style={styles.emptyText}>No hay ventas registradas.</Text>
        ) : (
          <FlatList
            data={salesData}
            keyExtractor={(item) => item.id}
            numColumns={2} 
            columnWrapperStyle={{ justifyContent: 'space-between' }} 
            renderItem={({ item }) => {
             
              const hasImage = item.imagenes && typeof item.imagenes === 'string' && item.imagenes.trim() !== '';

              return (
                <TouchableOpacity 
                  style={[styles.saleItem, { width: '48%', marginBottom: 15 }]} 
                  onPress={() => {
                    router.push({
                      pathname: '/InfPollo',
                      params: {
                        name: item.tipo || 'Sin Tipo',
                        info: item.comentario || 'No hay comentarios',
                        image: hasImage ? item.imagenes : '',
                        edad: item.edad || 'No disponible'
                      }
                    });
                  }}
                >
                  <Image
                    source={hasImage ? { uri: item.imagenes } : noImagePath}
                    style={[styles.imageTiend, { width: '100%', height: 120, borderRadius: 8, resizeMode: 'cover' }]} 
                  />
                  
                  {}
                  <View style={{ padding: 6 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 2 }}>
                      <Text style={[styles.textLeft, { fontWeight: 'bold', maxWidth: '70%' }]} numberOfLines={1}>{item.tipo || 'Sin Tipo'}</Text>
                      <Text style={[styles.textRight, { color: 'green', fontWeight: 'bold' }]}>{item.precioCompleto ?? 0}€</Text>
                    </View>
                    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2 }}>
                      <Text style={[styles.textLeft, { color: '#666', fontSize: 12 }]} numberOfLines={1}>{item.ubicacion || 'N/A'}</Text>
                      <Text style={[styles.textRight, { color: '#666', fontSize: 12 }]}>Cant: {item.numero ?? 0}</Text>
                    </View>
                    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2 }}>
                      <Text style={{ color: '#999', fontSize: 11 }}>Edad:</Text>
                      <Text style={{ color: '#333', fontSize: 11, fontWeight: '500' }}>{item.edad || 'N/A'}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
        
        {}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/Venta')} 
        >
          <Image source={addIcon} style={styles.addIcon} />  
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TiendaScreen;