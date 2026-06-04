import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { useRouter } from 'expo-router';
import Header from '../scripts/Header';
import styles from '../scripts/styles';

const VentaScreen = () => {
  const router = useRouter();

  return (
   
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      
      { }
      <Header />
      
      <ScrollView contentContainerStyle={localStyles.scrollContainer}>
        <Text style={[styles.title, { marginTop: 10 }]}>Sección de Ventas</Text>
        
        <View style={localStyles.card}>
          <Text style={localStyles.cardText}>
            Hello
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.replace('/(tabs)/Home')}
        >
          <Text style={styles.buttonText}>Volver al Inicio</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  card : {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginVertical: 20,
  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
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