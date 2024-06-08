import React from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import CardStats from "../components/CardStats";

export default function HomeScreen({ navigation }) {
  const DATA = [
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
  ];

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to the Home Screen!</Text>
        <View>
          <Text>Statsss</Text>
        </View>
        <View style={styles.containercard}>
          {DATA.length === 0 ? (
            <Text>No tenes ningún proyecto</Text>
          ) : (
            <FlatList
              data={DATA}
              renderItem={({ item }) => (
                <CardStats
                  name={item.title}
                  price={item.price}
                  navigation={navigation}
                />
              )}
            />
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonC: {
    marginTop: 50,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  containercard: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
});
