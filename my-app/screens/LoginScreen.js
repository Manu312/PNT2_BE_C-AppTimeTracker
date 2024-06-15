import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AuthContext from '../services/AuthContext';

export default function LoginScreen() {
  const API_URL = process.env.API_URL;
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const usernameOpacity = useSharedValue(username ? 0 : 1);
  const passwordOpacity = useSharedValue(password ? 0 : 1);
  const { setAuthData } = useContext(AuthContext)

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/login`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        setAuthData({
          token: response.data.token, 
          data: response.data.user
        });
        await AsyncStorage.setItem("token", response.data.token);
      } else {
        Alert.alert("Usuario o contraseña incorrecta", response.error);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        Alert.alert("Error", error.response.data.error);
      } else {
        Alert.alert("Error", "Ha ocurrido un error, intentelo nuevamente.");
      }
    }
  };

  const llamaTest = async () => {
    try {
      const response = await axios.get(`${API_URL}/test`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

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

  const usernamePlaceholderStyle = useAnimatedStyle(() => ({
    opacity: usernameOpacity.value,
    position: "absolute",
    top: 15,
    left: 20,
  }));

  const passwordPlaceholderStyle = useAnimatedStyle(() => ({
    opacity: passwordOpacity.value,
    position: "absolute",
    top: 15,
    left: 20,
  }));

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.logo}>MyTime Tracker</Text>
        <Button title="Go to Register" onPress={() => llamaTest()} />
        <View style={styles.inputView}>
          <Animated.Text style={[styles.placeholder, usernamePlaceholderStyle]}>
            Username
          </Animated.Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => {
              setUsername(text);
              if (text !== "") {
                usernameOpacity.value = withTiming(0, {
                  duration: 300,
                  easing: Easing.inOut(Easing.ease),
                });
              }
            }}
            value={username}
            onFocus={() => handleFocus(usernameOpacity)}
            onBlur={() => handleBlur(username, usernameOpacity)}
          />
        </View>
        <View style={styles.inputView}>
          <Animated.Text style={[styles.placeholder, passwordPlaceholderStyle]}>
            Password
          </Animated.Text>
          <TextInput
            style={styles.inputText}
            secureTextEntry
            onChangeText={(text) => {
              setPassword(text);
              if (text !== "") {
                passwordOpacity.value = withTiming(0, {
                  duration: 300,
                  easing: Easing.inOut(Easing.ease),
                });
              }
            }}
            value={password}
            onFocus={() => handleFocus(passwordOpacity)}
            onBlur={() => handleBlur(password, passwordOpacity)}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
          <Text style={styles.registerText}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotText}>No recuerdo mi contraseña</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
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
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  registerText: {
    color: "#003f5c",
    paddingTop: 10,
    fontSize: 16,
  },
  forgotText: {
    color: "#003f5c",
    paddingTop: 15,
    fontSize: 16,
  },
});
