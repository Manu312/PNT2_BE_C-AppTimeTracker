import React, { useState } from "react";
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
  const { name, price } = route.params;
  const TABLE_HEAD = ["Head", "Head2", "Head3", "Head4"];

  const [tableData, setTableData] = useState([
    ["1", "2", "3", "4"],
    ["a", "b", "c", "d"],
    ["1", "2", "3", "456\n789"],
  ]);

  return (
    <View style={styles.container}>
      {/*       <Text style={styles.text}>Welcome to the Login Screen!</Text>
       <Button
         title="Go to Register"
         onPress={() => {
           navigation.navigate("RegisterScreen");
         }}
       />
       <Button
         title="Go to Home"
         onPress={() => {
           navigation.navigate("HomeScreen");
         }}
       /> */}
      <Text>PROYECTO: {name} </Text>
      <DataTable tableHead={TABLE_HEAD} tableData={tableData} />
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
