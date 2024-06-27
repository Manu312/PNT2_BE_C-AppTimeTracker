import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, Modal, Button } from "react-native";
import DataTable from "../components/DataTable";
import { useFocusEffect } from "@react-navigation/native";
import { ProjectContext } from "../contexts/ProjectContext";
import AuthContext from "../services/AuthContext";
import { format, set } from "date-fns";
import jornadaService from "../services/jornadas";
import ModalCustom from "../components/ModalCustom";
import Loading from "../components/Loading";

export default function ProjectScreen({ route }) {
  const { state } = useContext(ProjectContext);
  const { name, pricePerHour, idProject } = state.project;
  const TABLE_HEAD = [
    "Fecha Inicio",
    "Fecha final",
    "Horas trabajadas",
    "Total a cobrar",
  ];

  const [tableData, setTableData] = useState([]);
  const { authData } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalHoras, setTotalHoras] = useState(0);
  const [totalCobrar, setTotalCobrar] = useState(0);
  const [idJornada, setIdJornada] = useState(null);

  const handleTableData = (id) => {
    setModalVisible(true);
    setIdJornada(id);
    //setTableData(tableData.filter((item) => item.id !== id));
  };

  const deleteJornada = async () => {
    try {
      setLoading(true);
      const token = authData.token;

      if (token) {
        const jornada = await jornadaService.deleteJornada(
          idJornada,
          token,
          idProject
        );

        if (jornada.status === 200) {
          setModalVisible(false);
          getData();
        }
      }
    } catch (error) {
      setLoading(false);
      setModalVisible(false);

      console.log(error);
      console.log(error.message, "Error en deleteJornada de ProjectScreen");
      console.log(error, "Error en deleteJornada de ProjectScreen");
    }
  };
  const sumarTotalHoras = (data) => {
    const horasSuma = data.reduce((acc, item) => acc + item.hoursWorked, 0);
    setTotalHoras(horasSuma);
  };

  const sumarTotalCobrar = (data) => {
    const cobrarSuma = data.reduce((acc, item) => acc + item.price, 0);
    setTotalCobrar(cobrarSuma);
  };

  const getData = async () => {
    try {
      setLoading(true);
      const token = authData.token;

      if (token) {
        const jornadas = await jornadaService.getJornadas(idProject, token);

        if (jornadas.status === 201) {
          setLoading(false);
          const formattedData = jornadas.data.jornadas.map((jornada) => ({
            ...jornada,
            fechaInicio: format(
              new Date(jornada.fechaInicio),
              "dd/MM/yyyy HH:mm"
            ),
            fechaCierre: format(
              new Date(jornada.fechaCierre),
              "dd/MM/yyyy HH:mm"
            ),
          }));
          sumarTotalHoras(formattedData);
          sumarTotalCobrar(formattedData);
          setTableData(formattedData);
        }
      }
    } catch (error) {
      setLoading(false);
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
    <>
      {loading && <Loading />}
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>PROYECTO: {name} </Text>
          <Text style={styles.headerText}>
            Precio por hora: {pricePerHour}
          </Text>
          <Text style={styles.headerText}>
            Horas totales hechas: {totalHoras}
          </Text>
          <Text style={styles.headerText}>
            Total a cobrar: {totalCobrar}
          </Text>
        </View>
        {tableData.length > 0 ? (
          <DataTable
            tableHead={TABLE_HEAD}
            tableData={tableData}
            handleTableData={handleTableData}
          />
        ) : (
          <View style={{ justifyContent: "center", marginTop: 100 }}>
            <Text>Aún no se han creado jornadas.</Text>
          </View>
        )}

        <ModalCustom
          isVisible={isModalVisible}
          confirm={deleteJornada}
          cancel={() => {
            setModalVisible(false);
          }}
          titleConfirm="Eliminar"
          titleCancel="Cancelar"
          textModal="¿Estás seguro que deseas eliminar esta jornada?"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
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
});
