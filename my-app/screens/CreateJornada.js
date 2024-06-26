import React, { useState, useEffect, useContext } from "react";
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

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
//import {  parse } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import { ProjectContext } from "../contexts/ProjectContext";
import AuthContext from "../services/AuthContext";
import jornadaService from "../services/jornadas";

const CreateJornada = ({ route }) => {
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState("");
  const [dateErrorMessage, setDateErrorMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showDateTimePicker, setShowDateTimePicker] = useState(true);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [showEndDateTimePicker, setShowEndDateTimePicker] = useState(true);
  const [hoursWorked, setHoursWorked] = useState(0);
  const [price, setPrice] = useState(0);
  const { state } = useContext(ProjectContext);
  const { name, pricePerHour, idProject } = state.project;
  const { authData } = useContext(AuthContext);

  /*const defaultStartDate = parse("27/06/2024 17:00", "dd/MM/yyyy HH:mm", new Date());
  const defaultEndDate = parse("27/06/2024 20:00", "dd/MM/yyyy HH:mm", new Date());
  const [selectedDate, setSelectedDate] = useState(defaultStartDate);
  const [selectedEndDate, setSelectedEndDate] = useState(defaultEndDate);*/

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
      const priceResult = hoursWorked * pricePerHour;
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
    if (selectedDate && date <= selectedDate) {
      setDateErrorMessage(
        "La fecha de cierre no puede ser anterior a la fecha de inicio. Por favor, seleccione una fecha de inicio válida."
      );
      setShowDateTimePicker(true);
    } else {
      setSelectedEndDate(date);
      hideEndDatePicker();
      setShowEndDateTimePicker(false);
      setDateErrorMessage("");
    }
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
      const token = authData.token;

      if (token !== null) {
        const jornadaCreated = await jornadaService.createJornada(
          selectedDate,
          selectedEndDate,
          hoursWorked,
          price,
          idProject,
          token
        );

        if (jornadaCreated.status === 201) {
          Alert.alert("Jornada creada", "La jornada ha sido creada con éxito");
          navigation.navigate("ProjectScreen");
        }
      } else {
        navigation.replace("LoginScreen");
      }
    } catch (error) {
      console.error("Error sending data: ", error);
      Alert.alert(
        "Error",
        "No se pudo crear la jornada. Por favor, intenta nuevamente."
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text>ID DEL PROYECTO: {idProject}</Text>
        <Text style={styles.logo}>Anotá tu jornada</Text>
        {showDateTimePicker && (
          <Button
            title="Seleccionar fecha de inicio"
            onPress={showDatePicker}
          />
        )}
        {!showDateTimePicker && (
          <Text style={styles.selectedDateText}>
            Fecha inicio:{" "}
            {selectedDate ? format(selectedDate, "dd/MM/yyyy HH:mm") : ""}
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
            Fecha cierre:{" "}
            {selectedEndDate ? format(selectedEndDate, "dd/MM/yyyy HH:mm") : ""}
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
            value={
              hoursWorked > 0 ? hoursWorked.toString() : "Horas Trabajadas"
            }
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            editable={false}
            value={price > 0 ? price.toString() : "Precio"}
          />
        </View>

        {dateErrorMessage ? (
          <Text style={styles.errorText}>{dateErrorMessage}</Text>
        ) : null}

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

export default CreateJornada;

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
  selectedDateText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
