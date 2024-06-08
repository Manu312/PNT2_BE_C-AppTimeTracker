import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import DataTable from "../components/DataTable";

export default function ProjectScreen({ navigation, route }) {
  const { name, pricePerHour } = route.params;
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

  //@TODO Hacer un useffect para traernos la data de las jornadas desde el back
  useEffect(() => {
    const mockData = [
      {
        id: "adadacsijacija",
        fechaInicio: "2022-01-01",
        fechaFinal: "2024-01-07",
        horasTrabajadas: "40",
        totalACobrar: "$500",
      },
      {
        id: "4343adacsijacija",
        fechaInicio: "2014-01-08",
        fechaFinal: "2024-01-14",
        horasTrabajadas: "38",
        totalACobrar: "$475",
      },
      {
        id: "adhaw22yfuuovcw",
        fechaInicio: "2017-01-15",
        fechaFinal: "2024-01-21",
        horasTrabajadas: "42",
        totalACobrar: "$525",
      },
    ];

    setTableData(mockData);
  }, []);

  return (
    <View style={styles.container}>
      <Text>PROYECTO: {name} </Text>
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
