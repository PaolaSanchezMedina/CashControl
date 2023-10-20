import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const StartScreen = () => {

    const navigation = useNavigation();

    return (
        <View style={{
        }}>

            <Text
                style={{
                    fontSize: 40,
                    textAlign: "center",
                    marginTop: "50%"
                }}
            >CashControl</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={{
                    backgroundColor: "black",
                    padding: 10,
                    marginTop: "70%",
                    width: "50%",
                    alignSelf: "center",
                    borderRadius: 20,
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
            <TouchableOpacity
                onPress={() => navigation.navigate("Registro")}
                style={{
                    backgroundColor: "blue",
                    padding: 10,
                    marginTop: "10%",
                    width: "40%",
                    alignSelf: "center",
                    borderRadius: 20,
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        textAlign: "center",
                        color: "white"
                    }}
                >Registrarme
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default StartScreen;