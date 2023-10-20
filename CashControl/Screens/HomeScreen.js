import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Home")}
                    style={{
                        backgroundColor: "black",
                        padding: 10,
                        borderRadius: 10,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 25,
                            color: "white"
                        }}
                    >Transacciones
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container2}>
            <TouchableOpacity
                    onPress={() => navigation.navigate("Home")}
                    style={{
                        backgroundColor: "black",
                        padding: 10,
                        borderRadius: 10,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 25,
                            color: "white"
                        }}
                    >Presupuesto
                    </Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    container1: {
        alignItems: 'center',
        flex: 1,
    },
    container2: {
        alignItems: 'center',
        flex: 1,
    }
})