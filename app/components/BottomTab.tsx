import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CustomBottomTab() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Image
          source={require('../../assets/images/ImagesLiveSings/interprete.png')}
          style={styles.largeIcon}
        />
      </View>
      <View style={styles.icons}>
        <TouchableOpacity style={styles.iconItem} onPress={() => router.push('/screens/Learn')}>
          <Image source={require('../../assets/images/ImagesLiveSings/aprende.png')} style={styles.smallIcon} />
          <Text>Aprende</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconItem} onPress={() => router.push('/screens/Alphabet')}>
          <Image source={require('../../assets/images/ImagesLiveSings/alfabeto.png')} style={styles.smallIcon} />
          <Text>Alfabeto</Text>
        </TouchableOpacity>

        <Text style={styles.title}>INTERPRETE</Text>

        <TouchableOpacity style={styles.iconItem} onPress={() => router.push('/screens/Games')}>
          <Image source={require('../../assets/images/ImagesLiveSings/juegos.png')} style={styles.smallIcon} />
          <Text>Juegos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconItem} onPress={() => router.push('/screens/Profile')}>
          <Image source={require('../../assets/images/ImagesLiveSings/perfil.png')} style={styles.smallIcon} />
          <Text>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    padding: 20,
    width: '100%',
    height: '18%',
    position: 'relative',
  },
  circle: {
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  largeIcon: {
    width: '90%',
    height: '90%',
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  iconItem: {
    alignItems: 'center',
    marginTop: -55,
    flex: 1,
  },
  smallIcon: {
    width: 40,
    height: 40,
  },
});
