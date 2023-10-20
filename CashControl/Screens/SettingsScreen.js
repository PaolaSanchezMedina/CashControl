import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Text
                style={{
                    fontSize: 30,
                    textAlign: "center",
                    marginTop: "20%"
                }}
            >Settings Screen</Text>
            <TouchableOpacity
                //CAMBIAR LA LÓGICA PARA CERRAR SESIÓN
                onPress={() => navigation.navigate("Start")}
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