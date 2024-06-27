import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Table, Row } from "react-native-table-component";

const DataTable = ({ tableHead, tableData, handleTableData }) => {
  const handlePress = (id) => {
    handleTableData(id);
  };

  return (
    <>
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 1, borderColor: "#ddd" }}>
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
                  style={[styles.row, index % 2 && { backgroundColor: "#f9f9f9" }]}
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
    backgroundColor: "#fff",
    width: "100%",
  },
  head: {
    height: 40,
    backgroundColor: "#f1f8ff",
  },
  row: {
    height: 60,
    backgroundColor: "#fff",
  },
  text: {
    margin: 6,
    color: "#333",
    textAlign: "center",
  },
  button: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
});
