import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal"; // Importa la biblioteca de modales
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define la dirección IP en una variable
const ipAddress = "10.0.2.2";

const LoginScreen = () => {
  const navigation = useNavigation();

  // Estados para almacenar el nombre de usuario, contraseña y control del modal
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Función para mostrar el modal con un mensaje específico
  const toggleModal = (message) => {
    setModalMessage(message);
    setIsModalVisible(!isModalVisible);
  };

  // Función para manejar el inicio de sesión
const handleLogin = async () => {
  try {
    const userData = {
      username: username,
      password: password,
    };

    // Verifica datos de inicio de sesión
    console.log("Datos de inicio de sesión:", userData);

    // Crea la URL utilizando la variable para la dirección IP
    const apiUrl = `http://${ipAddress}:3000/login`;

    try {
      // Realiza la solicitud Axios
      const response = await axios.post(apiUrl, userData);

      // Imprime la respuesta completa del servidor para verificar la estructura
      console.log("Respuesta completa del servidor:", response);

      if (response.data.token && response.data.userID) {
        console.log("Token recibido:", response.data.token);
        console.log("ID de usuario recibido:", response.data.userID);

        await AsyncStorage.setItem("@token", response.data.token);
        await AsyncStorage.setItem("@userId", response.data.userID.toString()); // Convertir a cadena si es necesario
        console.log(
          "Token y ID de usuario almacenados correctamente en AsyncStorage."
        );

        navigation.navigate("Tabs");
      } else {
        // Manejar caso en el que no se reciba el token o el ID de usuario del servidor
        toggleModal("No se recibió el token o el ID de usuario del servidor");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);

      // Manejar error específico de autenticación
      if (error.response && error.response.status === 401) {
        toggleModal("Credenciales inválidas");
      } else {
        toggleModal("Error de autenticación:", error.message);
      }
    }

  } catch (error) {
    console.error("Error general:", error);
    toggleModal("Error general:", error.message);
  }
};


  return (
    <View style={styles.container}>
      {/* Inputs para el nombre de usuario y contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Nombre de Usuario"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      {/* Botón para iniciar sesión */}
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "black",
          padding: 10,
          marginTop: "10%",
          width: "50%",
          alignSelf: "center",
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            color: "white",
          }}
        >
          Iniciar sesión
        </Text>
      </TouchableOpacity>

      {/* Modal para mostrar mensajes al usuario */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => toggleModal("")}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{modalMessage}</Text>
          {/* Botón dentro del modal */}
          <TouchableOpacity
            onPress={() => toggleModal("")}
            style={styles.modalButton}
          >
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

// Estilos CSS para los elementos del componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default LoginScreen;
