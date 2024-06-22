import axios from "axios";
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
  Animated,
} from "react-native";
import { registerDataMock } from "../mocks/registerDataMock";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from '../services/AuthContext';

export default function RegisterScreen({ navigation }) {
  const API_URL = process.env.API_URL;
  const [firstName, setFirstName] = useState(registerDataMock.firstName);
  const [lastName, setLastName] = useState(registerDataMock.lastName);
  const [email, setEmail] = useState(registerDataMock.email);
  const [username, setUsername] = useState(registerDataMock.username);
  const [password, setPassword] = useState(registerDataMock.password);
  const [confirmPassword, setConfirmPassword] = useState(
    registerDataMock.confirmPassword
  );
  const { setAuthData } = useContext(AuthContext)

  //@TODO AUGUSTO: DESCOMENTAR ESTO PARA QUE QUEDE BIEN EN PRODUCCION. DATOS MOCKEADOS!!
  /*   
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState(""); */

  const [focusedInput, setFocusedInput] = useState(null); // For focus animation
  const [opacityAnim] = useState(new Animated.Value(1)); // Initial opacity

  const handleRegister = async () => {
    try {
      if (
        !username ||
        !email ||
        !password ||
        !confirmPassword ||
        !firstName ||
        !lastName
      ) {
        Alert.alert("Error", "Por favor, completa todos los campos.");
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert("Error", "Las contraseñas no coinciden.");
        return;
      }

      const sendData = await axios.post(
        `${API_URL}/api/v1/auth/register`,
        {
          username,
          email,
          password,
          firstName,
          lastName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (sendData.status === 201) {
        Alert.alert(
          "Registro exitoso",
          "¡Bienvenido! Tu cuenta ha sido creada."
        );
        console.log(sendData.data);
        const authData = {
          token: sendData.data.token, 
          data: sendData.data.user
        }
        setAuthData(authData);
      } else {
        Alert.alert(
          "Error",
          "No se pudo registrar el usuario. Por favor, intenta nuevamente."
        );
      }
    } catch (error) {
      console.error("Error sending data: ", error);
      if (error.response && error.response.data) {
        Alert.alert("Error", error.response.data.error);
      } else {
        Alert.alert("Error", "Ha ocurrido un error, intentelo nuevamente.");
      }
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setFocusedInput(null);
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
    Animated.timing(opacityAnim, {
      toValue: 0.7,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    setFocusedInput(null);
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleAlreadyHaveAccount = () => {
    navigation.replace("LoginScreen");
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.logo}>MyTime Tracker</Text>
        <Text style={styles.title}>New Account</Text>
        <View style={styles.inputContainer}>
          {[
            {
              placeholder: "Nombre",
              value: firstName,
              setter: setFirstName,
              name: "firstName",
            },
            {
              placeholder: "Apellido",
              value: lastName,
              setter: setLastName,
              name: "lastName",
            },
            {
              placeholder: "Correo electrónico",
              value: email,
              setter: setEmail,
              name: "email",
            },
            {
              placeholder: "Nombre de usuario",
              value: username,
              setter: setUsername,
              name: "username",
            },
            {
              placeholder: "Contraseña",
              value: password,
              setter: setPassword,
              name: "password",
              secure: true,
            },
            {
              placeholder: "Confirmar contraseña",
              value: confirmPassword,
              setter: setConfirmPassword,
              name: "confirmPassword",
              secure: true,
            },
          ].map((input, index) => (
            <Animated.View
              key={index}
              style={[
                styles.inputWrapper,
                focusedInput === input.name && { borderBottomColor: "#fb5b5a" },
                { opacity: focusedInput === input.name ? opacityAnim : 1 },
              ]}
            >
              <TextInput
                style={styles.inputText}
                placeholder={input.placeholder}
                placeholderTextColor="#003f5c"
                secureTextEntry={input.secure || false}
                value={input.value}
                onChangeText={input.setter}
                onFocus={() => handleFocus(input.name)}
                onBlur={handleBlur}
              />
            </Animated.View>
          ))}
        </View>
        <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
          <Text style={styles.registerText}>REGISTRAR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleAlreadyHaveAccount}
        >
          <Text style={styles.loginText}>Ya tengo una cuenta</Text>
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
    padding: 20,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 46,
    color: "#fb5b5a",
    marginBottom: 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#003f5c",
    marginBottom: 12,
  },
  inputContainer: {
    width: "100%",
  },
  inputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#003f5c",
    marginBottom: 14,
  },
  inputText: {
    height: 40,
    fontSize: 16,
    color: "#003f5c",
  },
  placeholder: {
    color: "rgba(0, 63, 92, 0.5)",
  },
  focusedInputWrapper: {
    borderBottomColor: "#fb5b5a",
  },
  registerBtn: {
    width: "100%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  registerText: {
    color: "white",
    fontWeight: "bold",
  },
  loginBtn: {
    width: "100%",
    borderColor: "#fb5b5a",
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  loginText: {
    color: "#fb5b5a",
    fontWeight: "bold",
  },
  alreadyHaveAccount: {
    marginTop: 12,
    color: "#003f5c",
    fontSize: 15,
  },
});
