import React from "react";
import { Button, Modal, Text, View, StyleSheet } from "react-native";

const ModalCustom = ({
  isVisible,
  confirm,
  cancel,
  titleConfirm,
  titleCancel,
  textModal,
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal visible={isVisible} transparent={true} animationType="slide">
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>{textModal}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title={titleCancel}
                onPress={() => {
                  cancel();
                }}
                color={"#000"}
              />
              <Button
                title={titleConfirm}
                onPress={() => {
                  confirm();
                }}
                color={"#fb5b5a"}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
});

export default ModalCustom;
