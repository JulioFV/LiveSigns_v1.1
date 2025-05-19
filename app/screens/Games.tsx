import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomTab from '../components/BottomTab';

const Games = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.container3}>
        <View style={styles.container0}>
          <Image
            source={require('../../assets/images/ImagesLiveSings/juegos.png')}
            style={styles.icon0}
          />
          <Text style={styles.title0}>Juego</Text>
        </View>

        <TouchableOpacity onPress={() => router.push('/screens/MemoryGame')}>
          <View style={styles.infoCard}>
            <Image
              source={require('../../assets/images/ImagesLiveSings/memo.png')}
              style={styles.image}
            />
            <Text style={styles.infoTitle}>Memorama</Text>
            <Text>Dale la vuelta a todas las cartas y encuentra todas las parejas.</Text>
          </View>
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
  image: {
    width: '100%',
    height: '60%',
    resizeMode: 'contain',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    width: '100%',
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#0056b3',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
});

export default Games;
