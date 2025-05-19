import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, Image, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";




const RecoveryPasswordp = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [email, setEmail] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);

  

  const handleRecoveryPassword = async () => {
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Recuperar Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleRecoveryPassword}>
        <Text style={styles.buttonText}>Enviar Correo</Text>
      </TouchableOpacity>

      <Modal transparent={true} visible={loading} animationType="fade">
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Image source={require('../../assets/images/ImagesLiveSings/logo.png')} style={styles.logo} />
                    <Text style={styles.textoModal}>Espera...</Text>
                    <ActivityIndicator size="large" color="#0000ff" />
                  </View>
                </View>
              </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textoModal:{
    fontSize: 20,
    fontWeight: "bold",
    color: '#12229d',
    marginBottom: 10,
    marginTop: 10,
  },
  logo: {
    width: 250,
    height: 110,
    marginBottom: 10,
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default RecoveryPasswordp;
