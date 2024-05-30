import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import axios from "axios";

const CreateProject = ({navigation}) => {
  const [projectName, setProjectName] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

    setErrorMessage(""); 
    console.log("Project name: ", projectName);
    console.log("Price per hour: ", pricePerHour);

    try {
      /*const data = await axios.post(
        "http://192.168.100.56:8000/api/v1/auth/test",
        {
          project_name: projectName,
          price_per_hour: pricePerHour,
          boca: "boca",
        }
      );
      console.log(data.data);*/
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.error("Error sending data: ", error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
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
    color: "red",
    fontSize: 20,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
