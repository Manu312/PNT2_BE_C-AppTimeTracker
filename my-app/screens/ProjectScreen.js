import React, { useContext, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import DataTable from "../components/DataTable";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProjectContext } from "../contexts/ProjectContext";
import { format } from "date-fns";

export default function ProjectScreen({ route }) {
  const API_URL = process.env.API_URL;

  const { state } = useContext(ProjectContext);
  const { name, pricePerHour, idProject } = state.project;
  const TABLE_HEAD = [
    "Fecha Inicio",
    "Fecha final",
    "Horas trabajadas",
    "Total a cobrar",
  ];

  const [tableData, setTableData] = useState([]);

  const handleTableData = (id) => {
    setTableData(tableData.filter((item) => item.id !== id));
  };

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token !== null) {
        const data = await axios.get(
          `${API_URL}/api/v1/jornada/${idProject}/jornadas`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data.status === 201) {
          const formattedData = data.data.jornadas.map((jornada) => ({
            ...jornada,
            fechaInicio: format(new Date(jornada.fechaInicio), "dd/MM/yyyy HH:mm"),
            fechaCierre: format(new Date(jornada.fechaCierre), "dd/MM/yyyy HH:mm"),
          }));
          setTableData(formattedData);
        }
      }
    } catch (error) {
      console.log(error.message, "Error en getData de ProjectScreen");
      console.log(error, "Error en getData de ProjectScreen");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
      return () => {};
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerText}>PROYECTO: {name} </Text>
      <Text style={styles.subHeaderText}>Precio por hora: {pricePerHour}</Text>
      <Text style={styles.subHeaderText}>Id del proyecto: {idProject}</Text>
      <Text style={styles.instructionText}>Presione un elemento para borrarlo</Text>
      </View>
      <DataTable
        tableHead={TABLE_HEAD}
        tableData={tableData}
        handleTableData={handleTableData}
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
  header: {
    padding: 16,
    backgroundColor: "#f1f8ff",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  subHeaderText: {
    fontSize: 14,
    color: "#666",
  },
  instructionText: {
    padding: 16,
    fontSize: 14,
    textAlign: "center",
    color: "#666",
  }
});
