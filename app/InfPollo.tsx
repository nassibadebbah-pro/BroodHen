import React from 'react';
import { View, Text, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; 
import styles from '../scripts/styles';

const InfPolloScreen = () => {
  const params = useLocalSearchParams();
  const { name, info, image } = params;

  // فحص أمان: لو لم تكن هناك بيانات، يعرض رسالة تنبيه
  if (!name || !info) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No hay información disponible</Text>
      </View>
    );
  }

  // 🛠️ الحل الذكي للصورة: فحص ما إذا كانت الصورة ممررة كمعرف رقمي (صورة محلية) أو رابط نصي
  let imageSource;
  if (image) {
    // إذا كانت الصورة قادمة من require ستكون عبارة عن سلسلة نصية تمثل رقماً، فنقوم بتحويلها
    const parsedImage = parseInt(image as string, 10);
    imageSource = isNaN(parsedImage) ? { uri: image as string } : parsedImage;
  }

  return (
    <View style={styles.container}>
      {/* 📸 عرض الصورة المحلية الصالحة القادمة من قائمة الطيور */}
      {imageSource && (
        <Image 
          source={imageSource} 
          style={styles.imageP} 
        />
      )}
      
      {/* 📝 عرض البيانات الحالية داخل واجهة التطبيق */}
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.info}>{info}</Text>
    </View>
  );
};

export default InfPolloScreen;