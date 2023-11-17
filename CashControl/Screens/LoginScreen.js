import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, query, where, getDocs, doc, getFirestore } from '@firebase/firestore';
import firebaseApp from '../firebase/firebaseConfig'; // Ajusta la ruta según tu estructura de carpetas
import Modal from 'react-native-modal'; // Importa la biblioteca de modales

const db = getFirestore(firebaseApp);

const LoginScreen = () => {
    const navigation = useNavigation();

    // Estados para almacenar el nombre de usuario, contraseña y control del modal
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Función para mostrar el modal con un mensaje específico
    const toggleModal = (message) => {
        setModalMessage(message);
        setIsModalVisible(!isModalVisible);
    };

    // Función para manejar el inicio de sesión
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
                toggleModal('Los datos no coinciden');
            }
        } catch (error) {
            console.error('Error de autenticación:', error.message);
            // Manejar el error, mostrar mensaje al usuario, etc.
        }
    };

    return (
        <View style={styles.container}>
            {/* Inputs para el nombre de usuario y contraseña */}
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
            {/* Botón para iniciar sesión */}
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

            {/* Modal para mostrar mensajes al usuario */}
            <Modal isVisible={isModalVisible} onBackdropPress={() => toggleModal('')}
                animationIn={"fadeIn"}
                animationOut={"fadeOut"}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>{modalMessage}</Text>
                    {/* Botón dentro del modal */}
                    <TouchableOpacity onPress={() => toggleModal('')} style={styles.modalButton}>
                        <Text style={styles.modalButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

// Estilos CSS para los elementos del componente
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
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default LoginScreen;
