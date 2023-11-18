import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Importa el hook useNavigation para la navegación

const SesionScreen = () => {
    const navigation = useNavigation(); // Obtiene la instancia de navegación

    return (
        <View style={{
        }}>
            {/* Título de la aplicación */}
            <Text
                style={{
                    fontSize: 40,
                    textAlign: "center",
                    marginTop: "20%"
                }}
            >CashControl</Text>

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
                        color: "white"
                    }}
                >Iniciar sesión
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default SesionScreen;
