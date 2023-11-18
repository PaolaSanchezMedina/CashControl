import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import ExpenseModal from "./ExpenseModal"; 

const ExpenseScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const saveExpense = (expenseData) => {
    // Lógica para guardar el gasto 
    console.log("Guardando gasto:", expenseData);
  };

  return (
    <View style={styles.generalContainer}>
      <Text style={{ fontSize: 30, textAlign: "center", marginTop: "20%" }}>
        Pantalla de gastos
      </Text>

      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={{ fontSize: 15, justifyContent: "center", alignItems: "center", paddingRight: 10 }}>
            Agregar gasto
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

      <ExpenseModal isVisible={isModalVisible} onClose={closeModal} onSave={saveExpense} />
    </View>
  );
};

const styles = StyleSheet.create({
  generalContainer: {
    flex: 0,
    padding: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0,
    flexDirection: 'row',
    padding: 15,
  }
});

export default ExpenseScreen;
