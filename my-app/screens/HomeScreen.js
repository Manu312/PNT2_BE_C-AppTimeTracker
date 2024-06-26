import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, FlatList, Button, Alert } from "react-native";
import CardStats from "../components/CardStats";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AuthContext from "../services/AuthContext";
import projectService from "../services/projects";
import Loading from "../components/Loading";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [dataForTable, setDataForTable] = useState([]);
  const [textWelcome, setTextWelcome] = useState("Bienvenido!");
  const { authData, setAuthData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    try {
      setLoading(true);
      const token = authData.token;
      if (token) {
        const projects = await projectService.getProjects(token);
        if (projects.status === 201) {
          setLoading(false);

          if (projects?.data?.username) {
            setTextWelcome(`Bienvenido, ${projects?.data?.username}!`);
          }
          setDataForTable([...projects?.data?.projects]);
        }
      } else {
        setLoading(false);
        throw new Error("Ha ocurrido un error");
      }
    } catch (e) {
      setLoading(false);
      Alert.alert("Error", "Ha ocurrido un error, intentelo nuevamente.");
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
        <Text style={styles.text}>{textWelcome}</Text>
        <View>
          <Text>Aquí verá sus proyectos</Text>
        </View>
        <View style={styles.containercard}>
          {dataForTable.length === 0 ? (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ margin: 20, fontSize: 20 }}>
                Todavia no tenes ningún proyecto
              </Text>
              <Button
                title="Crear Proyecto"
                onPress={() => {
                  navigation.navigate("CreateProject");
                }}
              />
            </View>
          ) : (
            <FlatList
              data={dataForTable}
              numColumns={2}
              renderItem={({ item }) => (
                <CardStats
                  name={item.name}
                  price={item.pricePerHour}
                  idProject={item.id}
                />
              )}
              style={styles.flatlist}
              contentContainerStyle={styles.flatlistContent}
            />
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "top",
    paddingTop: 50,
    alignItems: "center",
  },

  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  containercard: {
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
    width: "90%",
  },
  flatlist: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  flatlistContent: {
    justifyContent: "center",
    alignItems: "center",
  },
});
