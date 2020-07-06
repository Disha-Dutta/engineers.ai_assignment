import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";

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
        <Text style={styles.col}>{title ? title : "N/A"}</Text>
        <Text style={styles.col}>{URL ? URL : "N/A"}</Text>
        <Text style={styles.col}>
          {created_at ? moment(created_at).format("YYYY-MM-DD hh:mm:A") : "N/A"}
        </Text>
        <Text style={[styles.col, styles.author]}>
          {author ? author : "N/A"}
        </Text>
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
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  col: {
    width: "25%",
    padding: 6,
    borderLeftColor: "gray",
    borderLeftWidth: 1,
  },
  author: {
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
