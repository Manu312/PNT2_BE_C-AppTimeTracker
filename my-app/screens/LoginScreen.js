import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const usernameOpacity = useSharedValue(username ? 0 : 1);
    const passwordOpacity = useSharedValue(password ? 0 : 1);

  const handleLogin = async () => {
    try {
        console.log(username, password);
      const response = await fetch('http://localhost:8000/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'X-Powered-By': 'Express', 
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': '298',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      console.log("response", response);
      const result = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('token', JSON.stringify(result.token));
        navigation.replace('HomeScreen');
      } else {
        Alert.alert('Login Failed Password or username incorrect', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error(error);
    }
  };

  const handleFocus = (opacity) => {
    opacity.value = withTiming(0, { duration: 300, easing: Easing.inOut(Easing.ease) });
  };

  const handleBlur = (value, opacity) => {
    if (value === '') {
      opacity.value = withTiming(1, { duration: 300, easing: Easing.inOut(Easing.ease) });
    }
  };

  const usernamePlaceholderStyle = useAnimatedStyle(() => ({
    opacity: usernameOpacity.value,
    position: 'absolute',
    top: 15,
    left: 20,
  }));

  const passwordPlaceholderStyle = useAnimatedStyle(() => ({
    opacity: passwordOpacity.value,
    position: 'absolute',
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
        <View style={styles.inputView}>
          <Animated.Text style={[styles.placeholder, usernamePlaceholderStyle]}>
            Username
          </Animated.Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => {
              setUsername(text);
              if (text !== '') {
                usernameOpacity.value = withTiming(0, { duration: 300, easing: Easing.inOut(Easing.ease) });
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
              if (text !== '') {
                passwordOpacity.value = withTiming(0, { duration: 300, easing: Easing.inOut(Easing.ease) });
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
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
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
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    borderColor: '#003f5c',
    borderWidth: 1,
    position: 'relative',
  },
  inputText: {
    height: 50,
    color: '#003f5c',
    paddingLeft: 20,
    paddingRight: 20,
  },
  placeholder: {
    color: 'rgba(0, 63, 92, 0.5)',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
  registerText: {
    color: '#003f5c',
    paddingTop:10,
    fontSize: 16,
  },
  forgotText: {
    color: '#003f5c',
    paddingTop:15,
    fontSize: 16,
  },
});
