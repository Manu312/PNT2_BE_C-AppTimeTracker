import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, Alert } from "react-native";
import CardStats from "../components/CardStats";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function HomeScreen() {
  const API_URL = process.env.API_URL;
  const navigation = useNavigation();
  // const navigation = useNavigation();
  const [dataForTable, setDataForTable] = useState([]);
  const [textWelcome, setTextWelcome] = useState("Welcome to the Home Screen!");

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        const data = await axios.get(`${API_URL}/api/v1/project/all`, {
          headers: {
            Authorization: `Bearer ${value}`,
          },
        });
        if (data.status === 201) {
          if (data?.data?.username) {
            setTextWelcome(`Welcome, ${data?.data?.username}!`);
          }
          setDataForTable([...data?.data?.projects]);
        }
      } else {
        throw new Error("Ha ocurrido un error");
      }
    } catch (e) {
      console.log(e, "Error en getData de Home Screen");
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
      <View style={styles.container}>
        <Text style={styles.text}>{textWelcome}</Text>
        <View>
          <Text>Statsss</Text>
        </View>
        <View style={styles.containercard}>
          {dataForTable.length === 0 ? (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 90,
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
                <CardStats name={item.name} price={item.pricePerHour} />
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
