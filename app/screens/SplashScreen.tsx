import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const SplashScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      router.replace('/screens/Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido</Text>
      <Text style={styles.title}>LiveSigns</Text>
      <Image
        source={require('../../assets/images/ImagesLiveSings/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.loadingText}>Loading...</Text>
      <ActivityIndicator size="large" color="#007BFF" style={styles.loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loading: {
    marginTop: 20,
  },
  logo: {
    width: 350,
    height: 150,
    marginBottom: 20,
    marginTop: 20,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#007BFF',
    marginTop: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default SplashScreen;
