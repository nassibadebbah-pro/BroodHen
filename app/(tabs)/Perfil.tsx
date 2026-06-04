import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../scripts/styles';

const PerfilScreen = () => {
  // يمكنك مستقبلاً جلب بيانات المستخدم الحالي من Firebase Auth هنا
  const userEmail = "usuario@correo.com"; 

  return (
    <View style={styles.containerLog || styles.container}>
      <View style={localStyles.profileCard}>
        {/* أيقونة افتراضية للملف الشخصي */}
        <View style={localStyles.avatarPlaceholder}>
          <Text style={localStyles.avatarText}>👤</Text>
        </View>

        <Text style={styles.title || localStyles.username}>Mi Perfil</Text>
        <Text style={styles.info || localStyles.email}>{userEmail}</Text>

        <TouchableOpacity 
          style={[styles.button || localStyles.logoutButton, { marginTop: 30 }]}
          onPress={() => {
            console.log('Cerrar sesión');
            // هنا يمكنك إضافة دالة تسجيل الخروج من Firebase مستقبلاً
          }}
        >
          <Text style={styles.buttonText || localStyles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// تصميمات احتياطية سريعة في حال لم تكن بعض المسميات موجودة في ملف styles الموحد لديك
const localStyles = StyleSheet.create({
  profileCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '90%',
    alignSelf: 'center',
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 50,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// ⚠️ هذا هو السطر الأهم الذي كان يسبق كل المشاكل، تأكد من عدم حذفه:
export default PerfilScreen;