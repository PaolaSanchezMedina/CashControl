import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Importa el hook useNavigation para la navegación
import AsyncStorage from "@react-native-async-storage/async-storage";

const SesionScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    checkIfLoggedIn(); // Verificar si el usuario ya tiene una sesión iniciada
  }, []); // Ejecutar solo una vez al cargar el componente

  const checkIfLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem("token"); // Obtener el token almacenado

      // Si hay un token, significa que el usuario tiene una sesión iniciada
      // Redirigir al usuario a la pantalla de inicio (por ejemplo, 'Home')
      if (token) {
        navigation.navigate("Home"); // Cambia 'Home' por el nombre de tu pantalla de inicio
      }
    } catch (error) {
      console.error("Error al verificar la sesión:", error.message);
    }
  };

  return (
    <View style={{}}>
      {/* Título de la aplicación */}
      <Text
        style={{
          fontSize: 40,
          textAlign: "center",
          marginTop: "20%",
        }}
      >
        CashControl
      </Text>

      {/* Botón para iniciar sesión */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")} // Navega a la pantalla de inicio de sesión al presionar este botón
        style={{
          backgroundColor: "red",
          padding: 10,
          marginTop: "150%",
          width: "50%",
          alignSelf: "center",
          borderRadius: 150,
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
    </View>
  );
};

export default SesionScreen;
