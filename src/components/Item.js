import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Item({ title }) {
  return (
    <TouchableOpacity style={{ flex: 1 }}>
      <View style={styles.row}>
        <Text>{title}</Text>
        <StatusBar style="auto" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    width: "100%",
    flexDirection: "row",
  },
  col: {
    width: "25%",
    padding: 4,
  },
});
