import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import IncomeModal from "./IncomeModal";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define la dirección IP en una variable
const ipAddress = "10.0.2.2";
const IncomeScreen = () => {
 const navigation = useNavigation();
 const [isModalVisible, setModalVisible] = useState(false);
 const [incomeTransactions, setIncomeTransactions] = useState([]);

 const openModal = () => {
   setModalVisible(true);
 };

 const closeModal = () => {
   setModalVisible(false);
 };

  const saveIncome = async (incomeData) => {
    try {

      // Crea la URL utilizando la variable para la dirección IP
      const userId = await AsyncStorage.getItem('@userId');
      const apiUrl = `http://${ipAddress}:3000/transactions?type=Income&userId=${userId}`;
      const response = await axios.post(apiUrl, incomeData);

      console.log("Respuesta del servidor:", response.data);

      onClose(); // Cerrar el modal después de agregar la transacción
      
      // Actualizar la lista de transacciones después de cerrar el modal y guardar la transacción exitosamente
      fetchIncomeTransactions(); // Llama a la función para obtener las transacciones actualizadas
    } catch (error) {
      console.error("Error al agregar ingreso:", error);
      // Manejar errores, mostrar mensajes de error, etc.
    }
  };

  useEffect(() => {
    async function fetchIncomeTransactions() {
      try {
        const userId = await AsyncStorage.getItem('@userId');
        const response = await axios.get(`http://${ipAddress}:3000/transactions?type=Income&userId=${userId}`);
        setIncomeTransactions(response.data);
      } catch (error) {
        console.error("Error al obtener transacciones de ingresos:", error);
      }
    }
  
    fetchIncomeTransactions();
  }, []);

  return (
    <View style={styles.generalContainer}>
      <Text style={{ fontSize: 30, textAlign: "center", marginTop: "20%" }}>
        Todos mis ingresos
      </Text>
     
      <View style={styles.container}>
        <View style={styles.container}>
          {incomeTransactions.map((transaction, index) => (
            <View key={index} style={styles.transactionContainer}>
            <Text>{transaction.Description}</Text>
              <Text>: ${transaction.Amount}</Text>
            </View>
          ))}
        </View>

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
          {incomeTransactions.map((transaction, index) => (
      <View key={index}>
        <Text>Monto: {transaction.amount}</Text>
        <Text>Descripción: {transaction.description}</Text>
        <Text>Categoría: {transaction.category}</Text>
        <Text>Método de pago: {transaction.paymentMethod}</Text>
      </View>
    ))}

          <TouchableOpacity
            onPress={openModal}
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
            <Text style={{ fontSize: 15, color: "white" }}>
              <AntDesign name="pluscircleo" size={24} color="white" />
            </Text>
          </TouchableOpacity>
          
        </View>
      </View>

      <IncomeModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onSave={saveIncome}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  generalContainer: {
    flex: 0,
    padding: 15,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0,
    flexDirection: "row",
    padding: 15,
  },
  transactionContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  text: {
    marginRight: 10,
  },
});

export default IncomeScreen;
