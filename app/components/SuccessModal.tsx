import React from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SuccessModalProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ visible, message, onClose }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image
            source={require('../../assets/images/ImagesLiveSings/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.textoModal}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 25,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    elevation: 10,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 15,
    resizeMode: 'contain',
  },
  textoModal: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2E8B57',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
