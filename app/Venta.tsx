import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../scripts/Header';
import styles from '../scripts/styles';

const VentaScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* استدعاء الهيدر الموحد للتطبيق */}
      <Header />
      
      <ScrollView contentContainerStyle={localStyles.scrollContainer}>
        <Text style={styles.title}>Sección de Ventas</Text>
        
        <View style={localStyles.card}>
          <Text style={localStyles.cardText}>
            مرحباً بك في قسم المبيعات! هنا يمكنك إدارة مبيعات الطيور والبيض لاحقاً.
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.replace('/(tabs)/Home')}
        >
          <Text style={styles.buttonText}>Volver al Inicio</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// ستايلات محلية مؤقتة لتنظيم المظهر الخاص بهذه الصفحة
const localStyles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginVertical: 20,
    boxShadow: '0px 3px 5px rgba(0,0,0,0.1)',
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    lineHeight: 24,
  },
});

export default VentaScreen;