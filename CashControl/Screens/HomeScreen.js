import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  // Obtiene el objeto de navegación
  const navigation = useNavigation();

  return (
    <View style={styles.generalContainer}>
      {/* Sección principal */}
      <View style={styles.container}>
        {/* Subcontenedor para el primer elemento */}
        <View style={styles.subContainer}>
          <Text
            style={{
              fontSize: 25,
              color: "black",
            }}
          >
            Transacciones
          </Text>
        </View>
      </View>

      {/* Sección secundaria */}
      <View style={styles.container}>
        {/* Subcontenedor para el segundo elemento */}
        <View style={styles.subContainer}>
          {/* Botón de Metas */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={{
              backgroundColor: "black",
              padding: 10,
              borderRadius: 10,
              height: 100,
              width: 185,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 25,
                color: "white",
              }}
            >
              Metas
            </Text>
          </TouchableOpacity>
        </View>
        {/* Subcontenedor para el tercer elemento */}
        <View style={styles.subContainer}>
          {/* Botón de Establecer recordatorio */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={{
              backgroundColor: "black",
              padding: 10,
              borderRadius: 10,
              height: 100,
              width: 185,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 25,
                color: "white",
              }}
            >
              Establecer recordatorio
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

// Estilos para los componentes
const styles = StyleSheet.create({
  generalContainer: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 250,
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
});
