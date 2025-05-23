import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import BottomTab from '../components/BottomTab';
import CardForo from '../components/CardForo';
import { getIdUsuario } from '../models/utils/session';

interface Comentario {
  id: number;
  comentario: string;
  creado_en: string;
  autor: string;
}

const Learn = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comentario[]>([]); 
  const [loading, setLoading] = useState(false);

  const handleGetComments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://darkseagreen-wasp-520101.hostingersite.com/ws/LiveSigns/ApiF.php?api=getComments'
      );

      const arr = response.data.contenido ?? response.data;
      if (Array.isArray(arr)) {
        setComments(arr);
      } else {
        console.error('Se esperaba un arreglo, llegó:', arr);
        setComments([]);
      }
    } catch (error) {
      console.error('Error al obtener los comentarios:', error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    handleGetComments();
  }, []);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      return Alert.alert('Error', 'Por favor, ingresa un comentario.');
    }

    setLoading(true);
    try {
      const idUsuario = await getIdUsuario();
      const formData = new URLSearchParams({
        comentario: comment,
        idUsuario: getIdUsuario(),
      });

      const response = await axios.post(
        'https://darkseagreen-wasp-520101.hostingersite.com/ws/LiveSigns/ApiF.php?api=addComment',
        formData.toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      if (response.data.success) {
        Alert.alert('Éxito', 'Comentario registrado correctamente');
        setComment('');
        handleGetComments();
      } else {
        Alert.alert('Comentario guardado con exito');
      }
    } catch (error: any) {
      if (error.response) {
        Alert.alert(
          'Error del servidor',
          error.response.data?.message || 'Respuesta no válida'
        );
      } else if (error.request) {
        Alert.alert('Error de conexión', 'No se pudo conectar al servidor');
      } else {
        Alert.alert('Error', 'Ocurrió un error inesperado');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container3}>
        <View style={styles.container0}>
          <Image
            source={require('../../assets/images/ImagesLiveSings/foro.jpg')}
            style={styles.icon0}
          />
          <Text style={styles.title0}>Foro de Dudas</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>
            ¡Únete a nuestro foro de dudas y comparte tus preguntas!
          </Text>
          <Text>
            Si tienes preguntas o necesitas ayuda con alguna funcionalidad,
            este es el lugar perfecto para ti.
          </Text>
        </View>

        <TextInput
          style={styles.commentInput}
          placeholder="Escribe tu comentario aquí..."
          value={comment}
          onChangeText={setComment}
        />
        <Button title="Comentar" onPress={handleCommentSubmit} />

        {loading ? (
          <Text style={styles.loadingText}>Cargando comentarios...</Text>
        ) : comments.length > 0 ? (
          comments.map((c) => (
            <CardForo
              key={c.id}
              comentario={c.comentario}
              autor={c.autor}
              creadoEn={c.creado_en}
            />
          ))
        ) : (
          <Text style={styles.noComments}>No hay comentarios aún.</Text>
        )}
      </ScrollView>

      <BottomTab />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0056b3' },
  container3: {
    alignItems: 'center',
    padding: 20,
  },
  container0: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 30,
    width: '100%',
    borderRadius: 8,
  },
  icon0: { width: 30, height: 30, marginRight: 10 },
  title0: {
    color: '#050a30',
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  infoTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  commentInput: {
    height: 50,
    width: '100%',
    borderColor: '#3a9bdc',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loadingText: { color: '#fff', marginTop: 20 },
  noComments: { color: '#fff', marginTop: 20 },
});

export default Learn;
