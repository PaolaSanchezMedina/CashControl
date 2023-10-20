import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SesionScreen = () => {
    
    const navigation = useNavigation();

    return (
        <View style={{
        }}>
            
            <Text
                style={{
                    fontSize: 40,
                    textAlign: "center",
                    marginTop: "20%"
                }}
            >CashControl</Text>
            <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
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