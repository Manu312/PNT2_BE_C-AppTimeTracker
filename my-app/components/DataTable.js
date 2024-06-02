import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";

const DataTable = ({ tableHead, tableData }) => {
  return (
    <>
      <View>
        <Text>DataTable</Text>
      </View>
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 2, borderColor: "red" }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={tableData} textStyle={styles.text} />
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
  text: { margin: 6, color: "blue" },
});
