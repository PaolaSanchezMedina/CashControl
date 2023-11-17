import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
    const navigation = useNavigation();

    // Renderiza la pantalla de configuración
    return (
        <View>
            {/* Encabezado de la pantalla */}
            <Text
                style={{
                    fontSize: 30,
                    textAlign: "center",
                    marginTop: "20%"
                }}
            >Settings Screen</Text>

            {/* Botón para cerrar sesión */}
            <TouchableOpacity
                onPress={() => navigation.navigate("Start")} // Redirige a la pantalla de inicio al presionar este botón (debe ajustarse para cerrar sesión)
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
                        color: "white"
                    }}
                >Cerrar Sesión
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default SettingsScreen;
