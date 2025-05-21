import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BottomTab() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => router.push('/screens/Interpreter')}
        >
          <Image
            source={require('../../assets/images/ImagesLiveSings/interprete.png')}
            style={styles.largeIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.icons}>
        <TouchableOpacity style={styles.iconItem} onPress={() => router.push('/screens/Learn')}>
          <Image source={require('../../assets/images/ImagesLiveSings/aprende.png')} style={styles.smallIcon} />
          <Text>Foro</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconItem} onPress={() => router.push('/screens/Alphabet')}>
          <Image source={require('../../assets/images/ImagesLiveSings/alfabeto.png')} style={styles.smallIcon} />
          <Text>Alfabeto</Text>
        </TouchableOpacity>

        
        <View style={styles.iconItemLarge}>
          <Text style={styles.title}>INTERPRETE</Text>
        </View>

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
  paddingVertical: 10,  
  paddingHorizontal: 15,
  width: '100%',
  height: '16%',        
  position: 'relative',
},
  circle: {
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1, 
   
  },
  circleButton: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeIcon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  iconItem: {
    alignItems: 'center',
    marginTop: -55,
    flex: 1,
  },
   iconItemLarge: {
    alignItems: 'center',
    marginTop: -45,
    flex: 1.5,
  },
  
  smallIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
