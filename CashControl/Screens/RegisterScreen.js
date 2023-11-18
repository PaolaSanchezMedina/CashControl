// Importa las librerías y componentes necesarios
import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc, serverTimestamp, getFirestore } from 'firebase/firestore'; // Importa métodos de Firebase Firestore
import firebaseApp from '../firebase/firebaseConfig'; // Importa la configuración de Firebase (ajusta la ruta según tu estructura de carpetas)
import Modal from 'react-native-modal'; // Importa la biblioteca de modales
import { Ionicons } from '@expo/vector-icons'; // Importa iconos de Ionicons

const db = getFirestore(firebaseApp); // Inicializa Firebase Firestore con la configuración previamente importada

const RegisterScreen = () => {
    const navigation = useNavigation(); // Obtiene la navegación actual

    // Define los estados para los datos del registro y para el manejo del modal
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerific, setPasswordVerific] = useState('');
    const [email, setEmail] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Función para alternar la visibilidad del modal
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    // Función para manejar el registro del usuario
    const handleRegister = async () => {
        try {
            if (password !== passwordVerific) {
                toggleModal(); // Activa el modal si las contraseñas no coinciden
                return;
            }

            // Almacena la información del usuario en Firebase Firestore
            const usuariosCollection = collection(db, 'usuarios'); // Obtiene la colección 'usuarios'
            const userDocRef = await addDoc(usuariosCollection, {
                username: username,
                email: email,
                password: password, // Agrega el campo de contraseña
                registrationDate: serverTimestamp(), // Añade la fecha de registro (timestamp del servidor)
            });

            console.log('Usuario registrado exitosamente');
            console.log('Documento de usuario almacenado en Firestore con ID:', userDocRef.id);

            // Navega a la página 'Tabs' después del registro exitoso
            navigation.navigate('Tabs');
        } catch (error) {
            console.error('Error al registrar usuario:', error.message);
            // Maneja el error, por ejemplo, mostrando un mensaje al usuario
        }
    };

    // Función para alternar la visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        // Vista principal del componente de registro
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Ingresa tus datos:</Text>
            </View>

            {/* Campos de texto para el correo electrónico, usuario y contraseñas */}
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />

            <TextInput
                style={styles.input}
                placeholder="Usuario"
                onChangeText={(text) => setUsername(text)}
                value={username}
            />

            {/* Contenedor para las contraseñas */}
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.container}
                    placeholder="Contraseña"
                    secureTextEntry={!isPasswordVisible}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
            </View>

            {/* Contenedor para repetir la contraseña y el botón de visibilidad */}
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.container}
                    placeholder="Repite la contraseña"
                    secureTextEntry={!isPasswordVisible}
                    onChangeText={(text) => setPasswordVerific(text)}
                    value={passwordVerific}
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                    <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
                </TouchableOpacity>
            </View>

            {/* Botón para registrar */}
            <TouchableOpacity
                onPress={handleRegister}
                style={{
                    backgroundColor: "blue",
                    padding: 10,
                    marginTop: "10%",
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
                >Registrarme
                </Text>
            </TouchableOpacity>

            {/* Modal para mostrar un mensaje si las contraseñas no coinciden */}
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}
                animationIn={"fadeIn"}
                animationOut={"fadeOut"}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>Contraseñas no coinciden</Text>
                    <TouchableOpacity onPress={toggleModal} style={styles.modalButton}>
                        <Text style={styles.modalButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

// Estilos para el componente de registro
const styles = StyleSheet.create({
    // Estilos para la vista principal
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Estilos para los campos de texto
    input: {
        width: '80%',
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    // Estilos para el contenedor de las contraseñas
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    // Estilos para el contenedor del texto principal
    textContainer: {
        padding: 10,
    },
    // Estilos para el texto principal
    text: {
        fontSize: 20,
        textAlign: "center",
    },
    // Estilos para el contenedor del modal
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    // Estilos para el texto del modal
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    // Estilos para el botón del modal
    modalButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    // Estilos para el texto del botón del modal
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default RegisterScreen; // Exporta el componente de registro
