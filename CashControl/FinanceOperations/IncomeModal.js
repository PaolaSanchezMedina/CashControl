import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define la dirección IP en una variable
const ipAddress = "10.0.2.2";

const IncomeModal = ({ isVisible, onClose, onSave }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = async () => {
    try {
      // Obtener el ID del usuario guardado en AsyncStorage
      const userId = await AsyncStorage.getItem("@userId");

      // Obtener la fecha actual
      const currentDate = new Date();

      const formattedDate = `${currentDate.getFullYear()}-${(
        currentDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${currentDate
        .getDate()
        .toString()
        .padStart(2, "0")} ${currentDate
        .getHours()
        .toString()
        .padStart(2, "0")}:${currentDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${currentDate
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;

      const incomeData = {
        userID: userId,
        transactionDate: formattedDate,
        transactionType: "Income",
        amount: parseFloat(amount),
        description: description,
        category: "Sin categoría",
        paymentMethod: "Son método",
      };

      // Crea la URL utilizando la variable para la dirección IP
      const apiUrl = `http://${ipAddress}:3000/transactions`;
      const response = await axios.post(apiUrl, incomeData);

      console.log("Respuesta del servidor:", response.data);

      // Cerrar el modal después de agregar la transacción
      onClose();
      showAlert(response.data); // Llama a la función showAlert con la respuesta del servidor
    } catch (error) {
      console.error("Error al agregar ingreso:", error);
      // Manejar errores, mostrar mensajes de error, etc.
    }
  };

  const showAlert = (data) => {
    if (data === "Transacción creada exitosamente") {
      Alert.alert(
        "Transacción Exitosa",
        "La transacción se creó exitosamente.",
        [{ text: "OK", onPress: () => console.log("Alerta cerrada") }],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Error al crear la transacción",
        "Hubo un error al crear la transacción.",
        [{ text: "OK", onPress: () => console.log("Alerta cerrada") }],
        { cancelable: false }
      );
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Agregar Ingreso</Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad"
            keyboardType="numeric"
            value={amount}
            onChangeText={(text) => setAmount(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSave} style={styles.button}>
              <Text style={styles.buttonText}>Agregar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.button}>
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    width: "100%",
    marginBottom: 20,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default IncomeModal;
