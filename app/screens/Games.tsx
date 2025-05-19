import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import BottomTab from '../components/BottomTab';

const Games = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
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
            <Text style={styles.description}>
              Dale la vuelta a todas las cartas y encuentra todas las parejas.
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <BottomTab />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0056b3',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#007bff',
  },
  container0: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    marginBottom: 30,
    width: '100%',
    borderRadius: 10,
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
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});

export default Games;
