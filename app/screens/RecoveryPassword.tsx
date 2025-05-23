import { NavigationProp } from "@react-navigation/native";
import axios from "axios";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { setIdUsuario } from "../models/utils/session";

const RecoveryPasswordp = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const validarEmail = (e: string) =>
    e.includes("@") && e.includes(".") && e.length >= 5;

  const generarContrasena = (long = 10) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let pwd = "";
    for (let i = 0; i < long; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pwd;
  };

  const handleRecover = async () => {
    if (!email) {
      return Alert.alert("Error", "El correo es obligatorio");
    }
    if (!validarEmail(email)) {
      return Alert.alert("Error", "Correo electrónico no válido");
    }

    setLoading(true);
    try {

      const buscar = new URLSearchParams({ email });
      const respBuscar = await axios.post(
        "https://darkseagreen-wasp-520101.hostingersite.com/ws/LiveSigns/ApiU.php?api=searchemail",
        buscar.toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      const contenido = respBuscar.data.contenido;
      if (!contenido) {
        return Alert.alert(
          "Correo no encontrado",
          "El correo ingresado no está registrado."
        );
      }
      const idUsuario = contenido.idUsuario;
      await setIdUsuario(idUsuario);

      const nuevaPwd = generarContrasena();

      const actualizar = new URLSearchParams({
        password: nuevaPwd,
        id: idUsuario,
      });
      const respUpdate = await axios.post(
        "https://darkseagreen-wasp-520101.hostingersite.com/ws/LiveSigns/ApiU.php?api=updatePassword",
        actualizar.toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      if (!respUpdate.data) {
        return Alert.alert(
          "Error",
          respUpdate.data.message || "No se pudo actualizar la contraseña"
        );
      }

      // 4) Mostrar alerta con la nueva contraseña
      Alert.alert("Contraseña Actualizada", `Tu nueva contraseña es:\n${nuevaPwd}`);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Hubo un problema de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Recuperar Contraseña</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleRecover}>
        <Text style={styles.buttonText}>Generar contraseña</Text>
      </TouchableOpacity>

      <Modal transparent visible={loading} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={require("../../assets/images/ImagesLiveSings/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.textoModal}>Procesando...</Text>
            <ActivityIndicator size="large" color="#12229d" />
          </View>
        </View>
      </Modal>

      <Image
        source={require("../../assets/images/ImagesLiveSings/logo.png")}
        style={styles.logo}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textoModal: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#12229d",
    marginVertical: 10,
  },
  logo: {
    width: 250,
    height: 110,
    marginVertical: 10,
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
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
