import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const HomeScreen = () => {
 const navigation = useNavigation();
 const [totalBalance, setTotalBalance] = useState(null);

 const fetchTotalBalance = async () => {
 try {
   const userId = await AsyncStorage.getItem('@userId');
   const response = await axios.get(`http://10.0.2.2:3000/summary/user/${userId}`);
   setTotalBalance(response.data[0].TotalBalance);
 } catch (error) {
   console.error("Error al obtener el balance total:", error);
 }
};

useEffect(() => {
 const interval = setInterval(fetchTotalBalance, 3000);
 return () => clearInterval(interval);
}, []);

 return (
 <View style={styles.generalContainer}>
  <View style={styles.container}>
    <View style={styles.subContainer}>
      <Text style={styles.transactionsTitle}>
        <Text style={{color: '#333'}}>Bienvenido a </Text>
        <Text style={{color: 'orange'}}>CashControl</Text>
      </Text>
      <Text style={{color: 'orange'}}></Text>
      <Icon name="user-circle" size={100} color="#333" />
      <Text style={{color: 'orange'}}></Text>
      <Text style={{color: '#333', fontSize: 16, fontWeight: 'bold'}}>Balance: {totalBalance}</Text>
    </View>
  </View>

  <View style={styles.container}>
    <View style={styles.subContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Metas
        </Text>
      </TouchableOpacity>
    </View>
    <View style={styles.subContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Establecer recordatorio
        </Text>
      </TouchableOpacity>
    </View>
  </View>
 </View>
 );
};

export default HomeScreen;

const styles = StyleSheet.create({
 generalContainer: {
 flex: 1,
 flexDirection: "column",
 justifyContent: "space-between",
 backgroundColor: 'white',
 },
 container: {
 alignItems: "center",
 flex: 1,
 flexDirection: "row",
 },
 subContainer: {
 alignItems: "center",
 flex: 1,
 },
 transactionsTitle: {
 fontSize: 30,
 textAlign: "center",
 marginTop: "20%",
 fontWeight: 'bold',
 },
 button: {
 backgroundColor: "#3f3c47",
 padding: 10,
 borderRadius: 5,
 height: 70,
 width: 150,
 justifyContent: "center",
 alignItems: "center",
 shadowColor: '#000',
 shadowOffset: { width: 0, height: 2 },
 shadowOpacity: 0.25,
 shadowRadius: 3.84,
 elevation: 5,
 },
 buttonText: {
 fontSize: 20,
 color: "white",
 },
});
