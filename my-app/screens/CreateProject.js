import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Alert,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import  AuthContext  from '../services/AuthContext';

const CreateProject = () => {
  const API_URL = process.env.API_URL;
  const navigation = useNavigation();
  const [projectName, setProjectName] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {authData} = useContext(AuthContext)

  useEffect(() => {
    console.log(authData);
  }, []);

  const projectNameOpacity = useSharedValue(projectName ? 0 : 1);
  const pricePerHourOpacity = useSharedValue(projectName ? 0 : 1);

  const projectNamePlaceholderStyle = useAnimatedStyle(() => ({
    opacity: projectNameOpacity.value,
    position: "absolute",
    top: 15,
    left: 20,
  }));

  const pricePerHourPlaceholderStyle = useAnimatedStyle(() => ({
    opacity: pricePerHourOpacity.value,
    position: "absolute",
    top: 15,
    left: 20,
  }));

  const handleFocus = (opacity) => {
    opacity.value = withTiming(0, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const handleBlur = (value, opacity) => {
    if (value === "") {
      opacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
    }
  };
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const sendData = async () => {
    if (projectName === "" || pricePerHour === "") {
      setErrorMessage("No se olvide de llenar el formulario");
      return;
    }
    try {
      console.log(authData);
      const token = authData.token;
        if (token) {
          const data = await axios.post(
            `${API_URL}/api/v1/project/create`,
            {
              project_name: projectName,
              price_per_hour: pricePerHour,
            },
            {
              headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (data.status === 201) {
            Alert.alert(
              "Proyecto creado",
              "¡Tu proyecto ha sido creado con éxito!"
            );
    
            navigation.navigate("HomeScreen");
          } else {
            Alert.alert("Error", "Hubo un error al crear el proyecto");
          }
        } else{
          console.log("No hay token");
        }
      } catch (error) {
      // Asegúrate de manejar el error adecuadamente
      console.log(error.message, "Error al crear el proyecto");
      Alert.alert("Error", "Hubo un problema al crear el proyecto");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.logo}>Crea tu proyecto</Text>
        <View style={styles.inputView}>
          <Animated.Text
            style={[styles.placeholder, projectNamePlaceholderStyle]}
          >
            Project name
          </Animated.Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => {
              setProjectName(text);
              if (text !== "") {
                projectNameOpacity.value = withTiming(0, {
                  duration: 300,
                  easing: Easing.inOut(Easing.ease),
                });
              }
            }}
            value={projectName}
            onFocus={() => handleFocus(projectNameOpacity)}
            onBlur={() => handleBlur(projectName, projectNameOpacity)}
          />
        </View>
        <View style={styles.inputView}>
          <Animated.Text
            style={[styles.placeholder, pricePerHourPlaceholderStyle]}
          >
            Precio por hora
          </Animated.Text>
          <TextInput
            keyboardType="numeric"
            style={styles.inputText}
            onChangeText={(text) => {
              setPricePerHour(text);
              if (text !== "") {
                pricePerHourOpacity.value = withTiming(0, {
                  duration: 300,
                  easing: Easing.inOut(Easing.ease),
                });
              }
            }}
            value={pricePerHour}
            onFocus={() => handleFocus(pricePerHourOpacity)}
            onBlur={() => handleBlur(pricePerHour, pricePerHourOpacity)}
          />
        </View>

        {errorMessage ? (
          <TextInput style={styles.errorText}>{errorMessage}</TextInput>
        ) : null}

        <Button
          title="Enviar"
          onPress={() => {
            sendData();
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateProject;

const styles = StyleSheet.create({
  errorText: {
    color: "#fb5b5a",
    fontSize: 20,
    marginBottom: 20,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    borderColor: "#003f5c",
    borderWidth: 1,
    position: "relative",
  },
  inputText: {
    height: 50,
    color: "#003f5c",
    paddingLeft: 20,
    paddingRight: 20,
  },
  placeholder: {
    color: "rgba(0, 63, 92, 0.5)",
  },
});
