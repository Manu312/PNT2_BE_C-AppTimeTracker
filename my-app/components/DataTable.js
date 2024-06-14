import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Table, Row } from "react-native-table-component";

const DataTable = ({ tableHead, tableData, handleTableData }) => {
  const handlePress = (id) => {
    handleTableData(id);
  };

  return (
    // Add opening curly brace here
    <>
      <View>
        <Text>DataTable</Text>
      </View>
      <Text>Presione un elemento para borrarlo</Text>
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 2, borderColor: "red" }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          {tableData.map((rowData, index) => {
            return (
              <TouchableOpacity
                style={styles.button}
                onPress={() => handlePress(rowData.id)}
                key={rowData.id}
              >
                <Row
                  key={index}
                  data={[
                    rowData.fechaInicio,
                    rowData.fechaCierre,
                    rowData.hoursWorked,
                    rowData.price,
                  ]}
                  style={styles.head}
                  textStyle={styles.text}
                />
              </TouchableOpacity>
            );
          })}
        </Table>
      </View>
    </>
  );
};

export default DataTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
    width: "100%",
  },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6, color: "blue" }, // <-- Esto es un objeto
});
