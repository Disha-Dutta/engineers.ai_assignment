import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Detail({ route }) {
  const { data } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.data}>{JSON.stringify(data)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  data: {
    marginTop: 8,
  },
});
