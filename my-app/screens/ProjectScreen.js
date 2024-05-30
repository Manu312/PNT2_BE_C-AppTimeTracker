import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    Button,
  } from "react-native";

export default function ProjectScreen({ navigation }){

   return (
     <View style={styles.container}>
       <Text style={styles.text}>Welcome to the Login Screen!</Text>
       <Button
         title="Go to Register"
         onPress={() => {
           navigation.navigate("RegisterScreen");
         }}
       />
       <Button
         title="Go to Home"
         onPress={() => {
           navigation.navigate("HomeScreen");
         }}
       />
     </View>
   );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontSize: 20,
      fontWeight: "bold",
    },
    }
);

