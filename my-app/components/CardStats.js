import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { ProjectContext } from "../contexts/ProjectContext";
const CardStats = ({ price, name, idProject }) => {
  const navigation = useNavigation();
  const project = useContext(ProjectContext);

  return (
    <TouchableOpacity
      onPress={() => {
        project.dispatch({
          type: "SET_PROJECT",
          project: {
            name: name,
            pricePerHour: price,
            idProject: idProject,
          },
        });
        navigation.navigate("ProjectScreen");
      }}
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
    minWidth: 150,
    minHeight: 150,
    overflow: "break-word",
    backgroundColor: "rgba(251,91,90,0.21)",
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android shadow
    elevation: 5,
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fb5b5a",
    flexWrap: "wrap",
    width: "90%",
  },
  cardContent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  earningsText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  hoursWorkedText: {
    fontSize: 16,
    color: "gray",
    alignItems: "right",
  },
});

export default CardStats;
