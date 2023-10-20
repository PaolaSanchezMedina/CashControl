import React from "react";
import { TextInput, View, Button, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = () => {
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleLogin = () => {
        navigation.navigate('Tabs');
        // Lógica de autenticación
        console.log('Usuario:', username);
        console.log('Contraseña:', password);
        // Lógica de autenticación
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Usuario"
                onChangeText={(text) => setUsername(text)}
                value={username}
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.container}
                    placeholder="Contraseña"
                    secureTextEntry={!isPasswordVisible}
                    onChangeText={(text) => setPassword(text)}
                    value={password}

                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                    <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={handleLogin}
                style={{
                    backgroundColor: "black",
                    padding: 10,
                    marginTop: "10%",
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
    },

    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%', // Establece el ancho del contenedor para asegurar que el ojo aparezca al lado del input
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
      },
});

export default LoginScreen;