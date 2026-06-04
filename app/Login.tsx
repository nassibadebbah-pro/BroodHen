import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { auth } from '../components/firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../scripts/styles';

const LoginScreen = () => {
  const router = useRouter(); 
  
  const [storedEmail, setStoredEmail] = useState<string>('');
  const [storedPassword, setStoredPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        const password = await AsyncStorage.getItem('password');
        if (email) setStoredEmail(email);
        if (password) setStoredPassword(password);
      } catch (e) {
        console.log('Error loading local data', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredData();
  }, []);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleLogin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      
      router.replace('/(tabs)/Home'); 
    } catch (error: any) {
      const errorCode = error.code;

      if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
        Alert.alert('Login Error', 'Invalid email or password.');
      } else {
        Alert.alert('Login Error', 'An unexpected error occurred. Please try again.');
      }
    }
  };

  if (isLoading) {
    return (
      <View style={styles.containerLog}>
        <Text style={{ color: '#000' }}>Loading...</Text>
      </View>
    );
  }

  return (
    <Formik
      initialValues={{ email: storedEmail, password: storedPassword }}  
      enableReinitialize={true} 
      validationSchema={LoginSchema}
      onSubmit={(values) => handleLogin(values.email, values.password)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.containerLog}>
          
          <Image
            source={require('../assets/images/icons-usuario.png')}
            style={styles.logo}
          />

          <TextInput
            style={styles.input}
            placeholder="Username (Email)"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')} 
            autoCapitalize="none"
            keyboardType="email-address"
          />
          
          {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!showPassword} 
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')} 
              autoCapitalize="none"
            />
            
            <TouchableOpacity 
              style={styles.showPasswordButton} 
              onPress={() => setShowPassword(prevState => !prevState)}
            >
              <Text style={styles.showPasswordText}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>
          {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}


          <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>

          <Text style={styles.forgotPassword}>Forgot password?</Text>
          
          <Text style={styles.newUser}>
            New user?{' '}
            <Text
              style={styles.link}
              onPress={() => router.push('/Signup')}
            >
              Sign up
            </Text>
          </Text>
        </View>
      )}
    </Formik>
  );
};

export default LoginScreen;