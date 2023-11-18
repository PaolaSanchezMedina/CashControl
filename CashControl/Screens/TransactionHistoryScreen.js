import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const TransactionHistoryScreen = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, amount: 100, category: "Ingreso", description: "Salario" },
    { id: 2, amount: -50, category: "Gasto", description: "Compras" },
  ]);

  return (
    <View style={styles.container}>
      <Text Text style={{ fontSize: 30, textAlign: "center", marginTop: "20%" }}>
        Historial de Transacciones
      </Text>
      
      {/* Lista de transacciones */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text>{item.category}</Text>
            <Text>{item.amount}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export default TransactionHistoryScreen;
