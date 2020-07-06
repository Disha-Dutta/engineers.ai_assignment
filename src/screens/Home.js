import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import Axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import Item from "../components/Item";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [pageCount, setPageCount] = useState(0);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    Axios.get("https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0")
      .then((resp) => setPosts(resp.data.hits))
      .catch((e) => console.log(e));

    const interval = setInterval(() => {
      setPageCount((pageCount) => pageCount + 1);
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={posts}
        renderItem={(item) => <Item title={item.title} />}
        keyExtractor={(item) => item.objectID}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
