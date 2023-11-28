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
      const userId = await AsyncStorage.getItem('@userId');
      const apiUrl = `http://${ipAddress}:3000/transactions?type=Income&userId=${userId}`;
      const response = await axios.post(apiUrl, incomeData);
      console.log("Respuesta del servidor:", response.data);
      onClose();
      fetchIncomeTransactions();
    } catch (error) {
      console.error("Error al agregar ingreso:", error);
    }
  };

  const deleteTransaction = async (transactionID) => {
    console.log(transactionID);
    try {
      const response = await axios.delete(`http://${ipAddress}:3000/transactions/${transactionID}`);
      console.log("Transacción eliminada exitosamente:", response.data);
    } catch (error) {
      console.error("Error al eliminar transacción:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const userId = await AsyncStorage.getItem('@userId');
        const response = await axios.get(`http://${ipAddress}:3000/transactions?type=Income&userId=${userId}`);
        setIncomeTransactions(response.data);
      } catch (error) {
        console.error("Error al obtener transacciones de ingresos:", error);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.generalContainer}>
      <Text style={{ fontSize: 30, textAlign: "center", marginTop: "20%" }}>
        Mis Ingresos
      </Text>

      <View style={styles.container}>
        {incomeTransactions.map((transaction) => (
          <View key={transaction.transactionID} style={styles.transactionContainer}>
            <Text style={{color: 'black', opacity: 0}}>{transaction.TransactionID}</Text>
            <Text>{transaction.Description}</Text>
            <Text>: ${transaction.Amount}</Text>
            <TouchableOpacity
              onPress={() => {
                deleteTransaction(transaction.TransactionID);
              }}
            >
              <AntDesign name="delete" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ))}

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
