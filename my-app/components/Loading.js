import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Loading = () => {
  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.text}>Cargando</Text>
        <ActivityIndicator size={60} color="#fb5b5a" />
      </View>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.76)",
    zIndex: 1000,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fb5b5a",
    fontSize: 30,
    marginBottom: 20,
  },
});
