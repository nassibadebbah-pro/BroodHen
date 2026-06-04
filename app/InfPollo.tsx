import React from 'react';
import { View, Text, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; 
import styles from '../scripts/styles';

const InfPolloScreen = () => {
  const params = useLocalSearchParams();
  const { name, info, image } = params;

  
  if (!name || !info) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No hay información disponible</Text>
      </View>
    );
  }

   let imageSource;
  if (image) {
    const parsedImage = parseInt(image as string, 10);
    imageSource = isNaN(parsedImage) ? { uri: image as string } : parsedImage;
  }

  return (
    <View style={styles.container}>
      {imageSource && (
        <Image 
          source={imageSource} 
          style={styles.imageP} 
        />
      )}
      
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.info}>{info}</Text>
    </View>
  );
};

export default InfPolloScreen;