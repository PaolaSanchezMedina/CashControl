import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.generalContainer}>
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Home")}
                        style={{
                            backgroundColor: 'black',
                            padding: 10,
                            borderRadius: 10,
                            height: 100,
                            width: 185*2,
                            justifyContent: 'center',
                            alignItems: 'center',
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
            </View>

            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Home")}
                        style={{
                            backgroundColor: "black",
                            padding: 10,
                            borderRadius: 10,
                            height: 100,
                            width: 185,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 25,
                                color: "white"
                            }}
                        >Metas
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.subContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Home")}
                        style={{
                            backgroundColor: "black",
                            padding: 10,
                            borderRadius: 10,
                            height: 100,
                            width: 185,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 25,
                                color: "white"
                            }}
                        >Establecer recordatorio
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    generalContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical: 250,
    },
    container: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    subContainer: {
        alignItems: 'center',
        flex: 1,
    }
})