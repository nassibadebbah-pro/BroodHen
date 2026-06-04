import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../scripts/styles'; // ملف الـ styles الذي استرجعته

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>شاشة الاستكشاف أو الملف الشخصي</Text>
    </View>
  );
}