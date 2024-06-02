import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "@rneui/themed";
const CardStats = ({ price, name, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProjectScreen", {
          name: name,
          price: price,
        })
      }
    >
      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.projectTitle}>{name}</Card.Title>
        <View style={styles.cardContent}>
          <Text style={styles.earningsText}>{price}</Text>
          <Text style={styles.hoursWorkedText}>Hs</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    width: 150,
    height: 150,
    backgroundColor: "#f8f8f8",
    borderColor: "#003f5c",
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fb5b5a",
  },
  cardContent: {
    alignItems: "center",
  },
  earningsText: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 10,
  },
  hoursWorkedText: {
    fontSize: 16,
    color: "gray",
    alignItems: "right",
  },
});

export default CardStats;
