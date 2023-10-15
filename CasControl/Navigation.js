import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

//REALIZAR VALIDACIÓN PARA SABER SI UN USUARIO TIENE ACCESO A LAS TABS

//Screens
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import StartScreen from "./Screens/StartScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import BottomTabNavigator from "./Screens/BottomTabNavigator";

const HomeStackNavigator = createNativeStackNavigator();

const Navigation = () => {
    return (
      <NavigationContainer>
        <HomeStackNavigator.Navigator
        initialRouteName="Start"
        >
          <HomeStackNavigator.Screen name="Home" component={HomeScreen} 
          options={{
            headerShown: false,
          }}/>
          <HomeStackNavigator.Screen name="Start" component={StartScreen} 
          options={{
            headerShown: false,
          }}/>
          <HomeStackNavigator.Screen name="Login" component={LoginScreen} />
          <HomeStackNavigator.Screen name="Registro" component={RegisterScreen} />
          <HomeStackNavigator.Screen name="Tabs" component={BottomTabNavigator} 
          options={{
            headerShown: false,
          }}/>
        </HomeStackNavigator.Navigator>
      </NavigationContainer>
    );
  };
  

export default Navigation;