import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Modal } from "react-native";

const IncomeModal = ({ isVisible, onClose, onSave }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState(""); 

  const handleSave = () => {
    onSave({
      amount: parseFloat(amount),
      description: description,
    });

    setAmount("");
    setDescription("");
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
    >
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
            <Button title="Agregar" onPress={handleSave} />
            <Button title="Cerrar" onPress={onClose} />
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
});

export default IncomeModal;
