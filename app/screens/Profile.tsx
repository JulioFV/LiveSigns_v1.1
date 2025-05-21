import axios from 'axios';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomTab from '../components/BottomTab';
import { getIdUsuario } from '../models/utils/session';

interface UserData {
  idUsuario: number;
  nombre: string;
  email: string;
}

const Profile = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [userData, setUserData] = React.useState<UserData | null>(null);

  React.useEffect(() => {
    handleGetCredentials();
  }, []);

  const handleGetCredentials = async () => {
    setLoading(true);
    try {
   
      const id = await getIdUsuario();
      if (!id) {
        return Alert.alert('Error', 'No se encontró sesión activa');
      }

      
      const formData = new URLSearchParams();
      formData.append('id', id.toString());

      const response = await axios.post(
        'https://darkseagreen-wasp-520101.hostingersite.com/ws/LiveSigns/ApiU.php?api=getCredentials',
        formData.toString(),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );

      const contenido = response.data.contenido;
      if (contenido) {
 
        setUserData({
          idUsuario: contenido.idUsuario,
          nombre: contenido.nombre,
          email: contenido.email,
        });
      } else {
        Alert.alert('Error', response.data.aviso || 'No se obtuvieron datos');
      }
    } catch (error) {
      console.error('Error en perfil:', error);
      Alert.alert('Error de conexión', 'Inténtalo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const cerrarSesion = async () => {
  
    router.replace('/screens/Login');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Text style={styles.title}>Perfil</Text>

        <View style={styles.avatarWrapper}>
          <Image
            source={require('../../assets/images/ImagesLiveSings/perfil.png')}
            style={styles.avatar}
          />
        </View>

        {userData ? (
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Datos del Usuario</Text>
            <Text>Nombre: {userData.nombre}</Text>
            <Text>Correo: {userData.email}</Text>
            <Text>Contraseña: **********</Text>
          </View>
        ) : (
          <Text style={styles.noDataText}>No hay datos para mostrar</Text>
        )}

        <TouchableOpacity onPress={cerrarSesion}>
          <Text style={styles.logout}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      <BottomTab />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#0056b3',
    alignItems: 'center',
  },
  profileCard: {
    flex: 1,
    width: '95%',
    backgroundColor: '#007bff',
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  avatarWrapper: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
  },
  infoCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noDataText: {
    color: '#fff',
    marginVertical: 20,
  },
  logout: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default Profile;
