import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';

const IncomeScreen = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.generalContainer}>
            <Text
                style={{
                    fontSize: 30,
                    textAlign: "center",
                    marginTop: "20%"
                }}
            >Pantalla de ingresos</Text>

            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Text
                        style={{
                            fontSize: 15,
                            justifyContent: "center",
                            alignItems: "center",
                            paddingRight: 10,
                        }}
                        >
                        Agregar ingreso
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Home")}
                        style={{
                            backgroundColor: "black",
                            padding: 10,
                            width: "15%",
                            alignSelf: "center",
                            borderRadius: 10,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 15,
                                color: "white",
                            }}
                        ><AntDesign name="pluscircleo" size={24} color="white" />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default IncomeScreen;

const styles = StyleSheet.create({
    generalContainer: {
        flex: 0,
        padding: 15,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        // flex: 1,
        // flexDirection: 'row',
    },
    subContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0,
        flexDirection: 'row',
        padding: 15,
    }
})