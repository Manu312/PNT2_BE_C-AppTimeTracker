import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from 'date-fns';

const CreateProject = ({navigation, route}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showDateTimePicker, setShowDateTimePicker] = useState(true);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [showEndDateTimePicker, setShowEndDateTimePicker] = useState(true);
  const [hoursWorked, setHoursWorked] = useState(0);
  const [price, setPrice] = useState(0);
  const { pricePerHour } = route.params;

  useEffect(() => {
    if (selectedDate && selectedEndDate) {
      const diffInMs = selectedEndDate.getTime() - selectedDate.getTime();
      const diffInHours = diffInMs / (1000 * 60 * 60);
      const roundedDiffInHours = Math.round(diffInHours * 10) / 10;
      setHoursWorked(roundedDiffInHours);
    }
  }, [selectedDate, selectedEndDate]);

  useEffect(() => {
    if (hoursWorked) {
      const priceResult = hoursWorked * pricePerHour
      setPrice(priceResult);
    }
  }, [hoursWorked]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
    setShowDateTimePicker(false);
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };
  
  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleEndConfirm = (date) => {
    setSelectedEndDate(date);
    hideEndDatePicker();
    setShowEndDateTimePicker(false);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const sendData = async () => {
    if (hoursWorked === 0 || price === 0) {
      setErrorMessage("No se olvide de completar los campos");
      return;
    }

    setErrorMessage(""); 

    try {
      const data = await axios.post(
        "http://192.168.100.56:8000/api/jornadas/create",
        {
          fechaInicio: selectedDate,
          fechaCierre: selectedEndDate,
          hoursWorked: hoursWorked,
          price: price,
        }
      );
      console.log(data.data);
      navigation.replace("ProjectScreen");
    } catch (error) {
      console.error("Error sending data: ", error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
      <Text style={styles.logo}>Anotá tu jornada</Text>
        {showDateTimePicker && (
          <Button
            title="Seleccionar fecha de inicio"
            onPress={showDatePicker}
          />
        )}
        {!showDateTimePicker && (
          <Text style={styles.selectedDateText}>
            Fecha inicio: {selectedDate ? format(selectedDate, 'dd/MM/yyyy HH:mm') : ""}
          </Text>
        )}
        {showEndDateTimePicker && (
          <Button
            title="Seleccionar fecha de cierre"
            onPress={showEndDatePicker}
          />
        )}
        {!showEndDateTimePicker && (
          <Text style={styles.selectedDateText}>
            Fecha cierre: {selectedEndDate ? format(selectedEndDate, 'dd/MM/yyyy HH:mm') : ""}
          </Text>
        )}


        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <DateTimePickerModal
          isVisible={isEndDatePickerVisible}
          mode="datetime"
          onConfirm={handleEndConfirm}
          onCancel={hideEndDatePicker}
        />

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            editable={false}
            placeholder="Horas Trabajadas"
            value={hoursWorked > 0? hoursWorked.toString() : "Horas Trabajadas"}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            editable={false}
            value={price > 0? price.toString() : "Precio"}
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
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#F8F8F8',
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
  selectedDateText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
