import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, Alert } from "react-native";
import CardStats from "../components/CardStats";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function HomeScreen() {
  const API_URL = process.env.API_URL;
  // const navigation = useNavigation();
  const [dataForTable, setDataForTable] = useState([]);
  const [textWelcome, setTextWelcome] = useState("Welcome to the Home Screen!");
  /*   const DATA = [
    {
      price: 20000,
      title: "First Item",
    },
    {
      price: 110000,
      title: "Second Item",
    },
    {
      price: 44000,
      title: "Third Item",
    },
  ]; */
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
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>{textWelcome}</Text>
        <View>
          <Text>Statsss</Text>
        </View>
        <View style={styles.containercard}>
          {dataForTable.length === 0 ? (
            <Text>No tenes ningún proyecto</Text>
          ) : (
            <FlatList
              data={dataForTable}
              numColumns={2}
              renderItem={({ item }) => (
                <CardStats name={item.name} price={item.pricePerHour} />
              )}
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
  },
});
