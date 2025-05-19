import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';


const Login = () => {
 
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validarCampos = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (!email.includes('@') || !email.includes('.') || email.length < 5) {
      Alert.alert('Error', 'Correo electrónico no válido');
      return;
    }

    handleLogin();
  };

  const handleLogin = async () => {
    router.replace('/screens/Interpreter');
      }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.container1}>
          <Image
            source={require('../../assets/images/ImagesLiveSings/itsoeh.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Image
            source={require('../../assets/images/ImagesLiveSings/isic.jpg')}
            style={styles.image1}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>LiveSigns</Text>
        <Image
          source={require('../../assets/images/ImagesLiveSings/logo.png')}
          style={styles.logo}
        />
        <View style={styles.card}>
          <Text style={styles.label}>Inicia Sesión</Text>
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="LiveSigns@itsoeh.edu.mx"
            keyboardType="email-address"
            autoCapitalize="none"
            inputMode="email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#050a30"
          />
          <Text style={styles.text}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            secureTextEntry
            autoCapitalize="none"
            placeholderTextColor="#050a30"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={validarCampos}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <Modal transparent={true} visible={loading} animationType="fade">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Image
                  source={require('../../assets/images/ImagesLiveSings/logo.png')}
                  style={styles.logo}
                />
                <Text style={styles.textoModal}>Espera...</Text>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            </View>
          </Modal>

          <Text
            style={styles.footer}
            onPress={() => router.push('/screens/RecoveryPassword')}
          >
            Recuperar Contraseña
          </Text>
          <Text
            style={styles.footer}
            onPress={() => router.push('/screens/Registration')}
          >
            ¿No tienes cuenta? Regístrate
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textoModal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#12229d',
    marginBottom: 10,
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#12229d',
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    marginTop: 10,
  },
  card: {
    width: '100%',
    height: '60%',
    padding: 20,
    backgroundColor: '#007BFF',
    borderRadius: 35,
  },
  label: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 250,
    height: 110,
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 15,
    opacity: 0.8,
    width: '100%',
    color: '#050a30',
  },
  footer: {
    marginTop: 20,
    color: '#fff',
    textAlign: 'center',
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  image: {
    height: 150,
    width: 200,
    marginHorizontal: 10,
  },
  image1: {
    height: 100,
    width: 150,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#050a30',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default Login;
