import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Item({
  title,
  URL,
  created_at,
  author,
  navigation,
  data,
}) {
  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() => navigation.navigate("Detail", { data })}
    >
      <View style={styles.row}>
        <Text>{title}</Text>
        <Text>{URL}</Text>
        <Text>{created_at}</Text>
        <Text>{author}</Text>
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
    borderBottomColor: "blue",
    borderBottomWidth: 1,
  },
  col: {
    width: "25%",
    padding: 4,
    borderLeftColor: "blue",
    borderLeftWidth: 1,
  },
});
