import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomTab from '../components/BottomTab';

const Interpreter = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>Contenido del intérprete</Text>
      </View>
      <BottomTab />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#0056b3',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Interpreter;
