import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

//REALIZAR VALIDACIÓN PARA SABER SI UN USUARIO TIENE ACCESO A LAS TABS

//Screens
import HomeScreen from "./Screens/HomeScreen";
import SesionScreen from "./Screens/SesionScreen";
import LoginScreen from "./Screens/LoginScreen";

const HomeStackNavigator = createNativeStackNavigator();

const Navigation = () => {
    return (
      <NavigationContainer>
        <HomeStackNavigator.Navigator
        initialRouteName="Sesion"
        >
          <HomeStackNavigator.Screen name="Home" component={HomeScreen} />
          <HomeStackNavigator.Screen name="Sesion" component={SesionScreen} 
          options={{
            headerShown: false,
          }}/>
          <HomeStackNavigator.Screen name="Login" component={LoginScreen} />
        </HomeStackNavigator.Navigator>
      </NavigationContainer>
    );
  };
  

export default Navigation;