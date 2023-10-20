import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ExpenseScreen = () => {
    
    const navigation = useNavigation();

    return (
        <View>
            <Text
                style={{
                    fontSize: 30,
                    textAlign: "center",
                    marginTop: "20%"
                }}
            >Pantalla de gastos</Text>
            <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
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
                >Botón de ejemplo
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default ExpenseScreen;