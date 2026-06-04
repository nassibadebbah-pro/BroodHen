import { useRouter } from 'expo-router';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../../components/firebase';
import styles from '../../scripts/styles';

type HatchLog = {
  id: string;
  type: string;
  incubationDate: string;
  extendHatch: boolean;
  createdAt: any;
};

function ArchivosScreen() {
  const [logs, setLogs] = useState<HatchLog[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'NuevaEcl'),
      (snapshot) => {
        const fetchedLogs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as HatchLog[];
        setLogs(fetchedLogs);
        setLoading(false);
      },
      (error) => {
        Alert.alert('Error', 'No se pudieron obtener los datos.');
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleLogPress = (logId: string) => {
    
    router.push({
      pathname: '/Porcentaje',
      params: { logId: logId }
    });
  };


  const formatFirebaseDate = (dateField: any) => {
    if (!dateField) return 'N/A';
    
  
    if (dateField.seconds) {
      return new Date(dateField.seconds * 1000).toLocaleDateString();
    }
    
  
    const parsedDate = new Date(dateField);
    return isNaN(parsedDate.getTime()) ? 'N/A' : parsedDate.toLocaleDateString();
  };

  const renderLogItem = ({ item }: { item: HatchLog }) => (
    <TouchableOpacity style={styles.logItem} onPress={() => handleLogPress(item.id)}>
      <Text style={styles.title}>
        {item.type} - {formatFirebaseDate(item.createdAt)}
      </Text>
      <Text style={styles.detail}>
        Día de incubación: {formatFirebaseDate(item.incubationDate)}
      </Text>
      <Text style={styles.detail}>
        Extender la eclosión: {item.extendHatch ? 'Sí' : 'No'}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007ACC" />
        <Text style={styles.loadingText}>Cargando registros...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registros de Incubaciones</Text>
      
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={renderLogItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay registros disponibles.</Text>}
      />
    </View>
  );
}

export default ArchivosScreen;