import React, { useContext, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import DataTable from "../components/DataTable";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProjectContext } from "../contexts/ProjectContext";

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
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data.status === 201) {
          setTableData(data.data.jornadas);
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
      <Text>PROYECTO: {name} </Text>
      <Text>Precio por hora: {pricePerHour}</Text>
      <Text>Id del proyecto: {idProject}</Text>
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
});
