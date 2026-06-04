import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Switch } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { db } from '../components/firebase'; 

function NewHatchScreen() {
  const [type, setType] = useState('');
  const [incubationDate, setIncubationDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [eggPrimerdia, setEggPrimerdia] = useState(''); 
  const [extendHatch, setExtendHatch] = useState(false);

  const handleSave = async () => {
    
    if (!type || eggPrimerdia === undefined || isNaN(Number(eggPrimerdia))) {
      Alert.alert('Error', 'Por favor, complete todos los campos obligatorios.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'NuevaEcl'), {
        type,
        incubationDate: incubationDate.toISOString(),
        eggPrimerdia: Number(eggPrimerdia), 
        extendHatch,
        createdAt: new Date().toISOString(),
      });

      Alert.alert(
        'Registro Exitoso',
        `Se ha guardado el registro con ID: ${docRef.id}`
      );

      handleCancel(); 
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el registro.');
      console.error('Error al guardar:', error);
    }
  };

  const handleCancel = () => {
    setType('');
    setIncubationDate(new Date());
    setEggPrimerdia('');
    setExtendHatch(false);
    Alert.alert('Acción cancelada', 'Todos los campos han sido reiniciados.');
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Registrar una nueva incubación</Text>

        
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Tipo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese el tipo de incubación"
            value={type}
            onChangeText={setType}
          />
        </View>

       
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Día de incubación:</Text>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>
              {incubationDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        </View>

        <DatePickerModal
          visible={showDatePicker}
          onDismiss={() => setShowDatePicker(false)}
          date={incubationDate}
          onConfirm={(params) => {
            setShowDatePicker(false);
            if (params.date) {
              setIncubationDate(params.date); 
            } else {
              Alert.alert('Erreur', 'Aucune date sélectionnée.');
            }
          }}
          mode="single" 
          locale="fr" 
        />

        
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Número de huevos:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese el número de huevos"
            keyboardType="numeric"
            value={eggPrimerdia ? eggPrimerdia.toString() : ''} 
            onChangeText={(text) => setEggPrimerdia(text)} 
          />
        </View>

        
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Extender la eclosión:</Text>
          <Switch value={extendHatch} onValueChange={setExtendHatch} />
        </View>

        <View style={styles.buttonContainer}>
         
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PaperProvider>
  );
}

export default NewHatchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#DCE7F3', 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f9f9f9',
  },
  datePickerButton: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
