import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import ExpenseModal from "./ExpenseModal";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define la dirección IP en una variable
const ipAddress = "10.0.2.2";

const ExpenseScreen = () => {
 const navigation = useNavigation();
 const [isModalVisible, setModalVisible] = useState(false);
 const [expenseTransactions, setExpenseTransactions] = useState([]);

 const openModal = () => {
   setModalVisible(true);
 };

 const closeModal = () => {
   setModalVisible(false);
 };

 const saveExpense = async (expenseData) => {
   try {
     const userId = await AsyncStorage.getItem('@userId');
     const apiUrl = `http://${ipAddress}:3000/transactions?type=Expense&userId=${userId}`;
     const response = await axios.post(apiUrl, expenseData);
     console.log("Respuesta del servidor:", response.data);
     onClose();
     fetchExpenseTransactions();
   } catch (error) {
     console.error("Error al agregar gasto:", error);
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
       const response = await axios.get(`http://${ipAddress}:3000/transactions?type=Expense&userId=${userId}`);
       setExpenseTransactions(response.data);
     } catch (error) {
       console.error("Error al obtener transacciones de gastos:", error);
     }
   }, 1000);
   return () => clearInterval(interval);
 }, []);

 return (
   <View style={styles.generalContainer}>
     <Text style={styles.title}>
       Mis Gastos
     </Text>

     <View style={styles.container}>
       {expenseTransactions.map((transaction) => (
         <View key={transaction.transactionID} style={styles.transactionContainer}>
           <Text style={styles.hiddenText}>{transaction.TransactionID}</Text>
           <Text style={styles.description}>{transaction.Description}</Text>
           <Text style={styles.amount}>: ${transaction.Amount}  </Text>
           <TouchableOpacity
             onPress={() => {
               deleteTransaction(transaction.TransactionID);
             }}
           >
             <AntDesign name="delete" size={24} color="#333" />
           </TouchableOpacity>
         </View>
       ))}

       <View style={styles.subContainer}>
         <Text style={styles.addExpenseText}>
           Agregar gasto
         </Text>
         <TouchableOpacity
           onPress={openModal}
           style={styles.addExpenseButton}
         >
           <Text style={styles.addExpenseButtonText}>
             <AntDesign name="pluscircleo" size={24} color="white" />
           </Text>
         </TouchableOpacity>
       </View>
     </View>

     <ExpenseModal
       isVisible={isModalVisible}
       onClose={closeModal}
       onSave={saveExpense}
     />
   </View>
 );
};

const styles = StyleSheet.create({
 generalContainer: {
   flex: 1,
   padding: 20,
   backgroundColor: 'white',
   flexDirection: "column",
   justifyContent: "space-between",
   alignItems: "center",
 },
 title: {
   fontSize: 30,
   textAlign: "center",
   marginTop: "20%",
   color: '#333',
   fontWeight: "bold",
 },
 container: {
   alignItems: "center",
   justifyContent: "center",
 },
 transactionContainer: {
   flexDirection: 'row',
   marginBottom: 10,
   backgroundColor: '#FFF',
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.25,
   shadowRadius: 3.84,
   elevation: 5,
   padding: 20,
   borderRadius: 10,
 },
 hiddenText: {
   color: 'black',
   opacity: 0,
 },
 description: {
   color: '#e3ba4b',
   fontWeight: 'bold',
 },
 amount: {
   color: '#333',
 },
 subContainer: {
   alignItems: "center",
   justifyContent: "center",
   flexDirection: "row",
   padding: 15,
 },
 addExpenseText: {
   fontSize: 15,
   justifyContent: "center",
   alignItems: "center",
   paddingRight: 10,
   color: '#333',
 },
 addExpenseButton: {
  backgroundColor: "#3f3c47",
  padding: 10,
  width: "15%",
  alignSelf: "center",
  borderRadius: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  justifyContent: "center",
  alignItems: "center",
  },
  addExpenseButtonText: {
  fontSize: 15,
  color: "white",
  },
 });
 
 export default ExpenseScreen;
 