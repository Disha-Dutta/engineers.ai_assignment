import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import Axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import Item from "../components/Item";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home({ navigation }) {
  const [pageCount, setPageCount] = useState(0);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    Axios.get("https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0")
      .then((resp) => {
        setPosts(resp.data.hits);
        console.log(resp.data.hits, "Priya");
      })

      .catch((e) => console.log(e));

    const interval = setInterval(() => {
      setPageCount((pageCount = pageCount + 1));
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (pageCount) {
      Axios.get(
        "https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageCount}"
      ).then((resp) => setPosts([...posts, ...resp.data.hits]));
    }
  }, [pageCount]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={posts}
        renderItem={(item) => (
          <Item
            title={item.title}
            URL={item.url}
            created_at={item.created_at}
            author={item.author}
            navigation={navigation}
            data={item}
          />
        )}
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
