import React from 'react';
import { Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import BottomTab from '../components/BottomTab';

const Alphabet = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container3}>
        <View style={styles.container0}>
          <Image
            source={require('../../assets/images/ImagesLiveSings/alfabeto.png')}
            style={styles.icon0}
          />
          <Text style={styles.title0}>Alfabeto</Text>
        </View>

        <Image
          source={require('../../assets/images/ImagesLiveSings/abcde.png')}
          style={styles.abc}
          resizeMode="contain"
        />
      </View>

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
    marginBottom: 20,
    width: '100%',
  },
  icon0: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  abc: {
    width: '100%',
    height: '60%',
  },
  title0: {
    color: '#050a30',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Alphabet;
