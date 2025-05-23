import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import SuccessModal from '../components/SuccessModal';

const Registration = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nombre, setNombre] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const validarCampos = async () => {
    if (!email.includes('@') || !email.includes('.') || email.length < 5) {
      Alert.alert('Error', 'El correo electrónico no es válido');
      return;
    } else if (password.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres');
      return;
    } else if (!email || !password || !nombre) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    } else if (password.includes('*') || password.includes('!') || password.includes('@') || password.includes('#') || password.includes('$') || password.includes('%')) {
      Alert.alert('Error', 'La contraseña no debe contener caracteres especiales como * ! @ # $ %');
      return;
    }
    handleRegister();
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const formData = new URLSearchParams();
      formData.append('nombre', nombre);
      formData.append('email', email);
      formData.append('password', password);

      const response = await axios.post(
        'https://darkseagreen-wasp-520101.hostingersite.com/ws/LiveSigns/ApiU.php?api=register',
        formData.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (response.data.success) {
        setLoading(false);
        Alert.alert('Éxito', 'Registro exitoso');
        setSuccess(true);
        router.push('/screens/Login');
      } else {
        Alert.alert('Usuario registrado con exito');
      }
    } catch (error: any) {
      if (error.response) {
        Alert.alert('Error del servidor', error.response.data?.message || 'Respuesta no válida del servidor');
      } else if (error.request) {
        Alert.alert('Error de conexión', 'No se pudo conectar al servidor');
      } else {
        Alert.alert('Error', 'Error desconocido al registrar');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Image source={require('../../assets/images/ImagesLiveSings/logo1.png')} style={styles.logo} />
        <View style={styles.card}>
          <Text style={styles.label}>Registro</Text>
          <Text style={styles.text}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Live Signs"
            keyboardType="ascii-capable"
            autoCapitalize="none"
            value={nombre}
            onChangeText={setNombre}
            placeholderTextColor="#fff"
          />
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="LiveSigns@gmail.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            placeholderTextColor="#fff"
          />
          <Text style={styles.text}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            placeholderTextColor="#fff"
          />
          <TouchableOpacity style={styles.button} onPress={validarCampos}>
            <Text style={styles.buttonText}>Registrarme</Text>
          </TouchableOpacity>

          <Text style={styles.footer} onPress={() => router.push('/screens/Login')}>
            ¿Ya tienes cuenta? Inicia Sesión
          </Text>
        </View>

        <Modal transparent={true} visible={loading} animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={require('../../assets/images/ImagesLiveSings/logo.png')} style={styles.logo} />
              <Text style={styles.textoModal}>Espera...</Text>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          </View>
        </Modal>

        <SuccessModal
          visible={success}
          message="Usuario registrado con éxito"
          onClose={() => {
            setSuccess(false);
            router.push('/screens/Login');
          }}
        />
      </SafeAreaView>
    </PaperProvider>
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
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#050a30',
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
    color: '#050a30',
    textAlign: 'left',
    marginTop: 10,
  },
  card: {
    width: '100%',
    height: '65%',
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 35,
  },
  label: {
    fontSize: 24,
    color: '#050a30',
    textAlign: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 250,
    height: 110,
    marginBottom: 80,
    marginTop: 50,
  },
  input: {
    height: 50,
    borderColor: '#050a30',
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: '#050a30',
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
    color: '#fff',
  },
  footer: {
    marginTop: 20,
    color: '#050a30',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 25,
    borderColor: '#050a30',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#050a30',
    fontSize: 18,
  },
});

export default Registration;
