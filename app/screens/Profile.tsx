import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomTab from '../components/BottomTab';

const Profile = () => {
  const router = useRouter();

  const cerrarSesion = () => {
    router.replace('/screens/Login'); // Redirige y reemplaza para evitar volver atrás
  };

  return (
    <View style={styles.container}>
      <View style={styles.container3}>
        <View style={styles.container0}>
          <Text style={styles.title0}>Perfil</Text>
        </View>

        <View style={styles.circle1}>
          <Image
            source={require('../../assets/images/ImagesLiveSings/perfil.png')}
            style={styles.profileIcon}
          />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Datos del Usuario</Text>
          <Text>Nombre: Nombre Usuario</Text>
          <Text>Correo Electrónico: NombreUsuario@gmail.com</Text>
          <Text>Contraseña: **********</Text>
        </View>

        <TouchableOpacity onPress={cerrarSesion}>
          <Text style={styles.username}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      <BottomTab />
    </View>
  );
};

const styles = StyleSheet.create({
  container3: {
    flex: 1,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#0056b3',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  container0: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    marginBottom: 50,
    width: '100%',
  },
  circle1: {
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  profileIcon: {
    width: '60%',
    height: '60%',
  },
  username: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title0: {
    color: '#050a30',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Profile;
