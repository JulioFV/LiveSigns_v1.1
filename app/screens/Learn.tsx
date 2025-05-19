import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import BottomTab from '../components/BottomTab';

const Learn = () => {
  return (
    <View style={styles.container}>
      <View style={styles.container3}>
        <View style={styles.container0}>
          <Image
            source={require('../../assets/images/ImagesLiveSings/aprende.png')}
            style={styles.icon0}
          />
          <Text style={styles.title0}>Aprende</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Vocabulario básico y frases comunes</Text>
          <Text>Saludos y presentaciones (Hola, ¿cómo estás?).</Text>
          <Text>Pronombres personales (yo, tú, él, nosotros, etc.).</Text>
          <Text>Números y días de la semana.</Text>
          <Text>Colores y emociones.</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Estructura gramatical</Text>
          <Text>Gramática del lenguaje de señas (orden de las palabras).</Text>
          <Text>Uso del espacio y la direccionalidad de los signos.</Text>
          <Text>Verbos y tiempos verbales básicos.</Text>
          <Text>Preguntas y respuestas en señas.</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Temas Específicos y Conversaciones</Text>
          <Text>Familia, profesiones y entorno cotidiano.</Text>
          <Text>Transporte y lugares en la ciudad.</Text>
          <Text>Alimentos y acciones diarias.</Text>
          <Text>Comunicación en entornos de trabajo y educación.</Text>
        </View>
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
  icon0: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title0: {
    color: '#050a30',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
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
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Learn;
