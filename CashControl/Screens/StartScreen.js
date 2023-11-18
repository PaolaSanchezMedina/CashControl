import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Importa la función useNavigation para la navegación

const StartScreen = () => {
    const navigation = useNavigation(); // Obtiene el objeto de navegación

    return (
        <View>
            {/* Título */}
            <Text style={{
                fontSize: 40,
                textAlign: "center",
                marginTop: "50%"
            }}>CashControl</Text>

            {/* Botón para iniciar sesión */}
            <TouchableOpacity
                onPress={() => navigation.navigate("Login")} // Navega a la pantalla de inicio de sesión al presionar este botón
                style={{
                    backgroundColor: "black",
                    padding: 10,
                    marginTop: "70%",
                    width: "50%",
                    alignSelf: "center",
                    borderRadius: 20,
                }}
            >
                <Text style={{
                    fontSize: 20,
                    textAlign: "center",
                    color: "white"
                }}>Iniciar sesión</Text>
            </TouchableOpacity>

            {/* Botón para registrarse */}
            <TouchableOpacity
                onPress={() => navigation.navigate("Registro")} // Navega a la pantalla de registro al presionar este botón
                style={{
                    backgroundColor: "blue",
                    padding: 10,
                    marginTop: "10%",
                    width: "40%",
                    alignSelf: "center",
                    borderRadius: 20,
                }}
            >
                <Text style={{
                    fontSize: 20,
                    textAlign: "center",
                    color: "white"
                }}>Registrarme</Text>
            </TouchableOpacity>
        </View>
    );
}

export default StartScreen;
