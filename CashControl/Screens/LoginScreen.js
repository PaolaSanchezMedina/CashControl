import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { collection, query, where, getDocs, doc, getFirestore } from '@firebase/firestore';
import firebaseApp from '../firebase/firebaseConfig'; // Ajusta la ruta según tu estructura de carpetas

const db = getFirestore(firebaseApp);

const LoginScreen = () => {
    const navigation = useNavigation();
    const auth = getAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            // Consultar la base de datos para verificar las credenciales
            const usersCollection = collection(db, 'usuarios');
            const q = query(usersCollection, where('username', '==', username), where('password', '==', password));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // Usuario autenticado correctamente
                const user = querySnapshot.docs[0].data();
                console.log('Usuario autenticado:', username);
                navigation.navigate('Tabs'); // Navegar a la pantalla después de la autenticación
            } else {
                // Credenciales incorrectas
                console.log('Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error de autenticación:', error.message);
            // Manejar el error, mostrar mensaje al usuario, etc.
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nombre de Usuario"
                onChangeText={(text) => setUsername(text)}
                value={username}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
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
});

export default LoginScreen;
