import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = () => {
  const navigation = useNavigation();

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      // Eliminar el token de autenticación almacenado
      await AsyncStorage.removeItem("token");

      // Redirigir a la pantalla de inicio
      navigation.navigate("Start");
      console.log("Sesión cerrada");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <View>
      {/* Encabezado de la pantalla */}
      <Text
        style={{
          fontSize: 30,
          textAlign: "center",
          marginTop: "20%",
        }}
      >
        Settings Screen
      </Text>

      {/* Botón para cerrar sesión */}
      <TouchableOpacity
        onPress={handleLogout} // Llama a la función para cerrar sesión
        style={{
          backgroundColor: "black",
          padding: 10,
          marginTop: "20%",
          width: "50%",
          alignSelf: "center",
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
            color: "white",
          }}
        >
          Cerrar Sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
