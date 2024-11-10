import React, { FC } from "react";
import { View, Text, Modal, StyleSheet, ActivityIndicator } from "react-native";
type LoadingModal = {
  visible: boolean;
  message?: string;
};
const LoadingModal: FC<LoadingModal> = ({ message, visible }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color="#61DBFB" />
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 200,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});

export { LoadingModal };
