import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import ExpenseModal from "./ExpenseModal";

const ExpenseScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  // Función para abrir el modal de gastos
  const openModal = () => {
    setModalVisible(true);
  };

  // Función para cerrar el modal de gastos
  const closeModal = () => {
    setModalVisible(false);
  };

  // Función para guardar el gasto (a implementar la lógica de guardado)
  const saveExpense = (expenseData) => {
    // Lógica para guardar el gasto
    console.log("Guardando gasto:", expenseData);
  };

  return (
    <View style={styles.generalContainer}>
      {/* Encabezado */}
      <Text style={{ fontSize: 30, textAlign: "center", marginTop: "20%" }}>
        Pantalla de gastos
      </Text>

      {/* Contenedor para agregar gasto */}
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text
            style={{
              fontSize: 15,
              justifyContent: "center",
              alignItems: "center",
              paddingRight: 10,
            }}
          >
            Agregar gasto
          </Text>
          {/* Botón para abrir el modal de agregar gasto */}
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
              {/* Icono para agregar gasto */}
              <AntDesign name="pluscircleo" size={24} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal para agregar gasto */}
      <ExpenseModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onSave={saveExpense}
      />
    </View>
  );
};

// Estilos para ExpenseScreen
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
});

export default ExpenseScreen; // Exporta ExpenseScreen como componente predeterminado
