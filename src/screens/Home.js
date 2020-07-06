import React, { useState, useEffect } from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";
import Axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import Item from "../components/Item";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home({ navigation }) {
  const [pageCount, setPageCount] = useState(0);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    Axios.get(
      "https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0"
    ).then((resp) => {
      setPosts(resp.data.hits);
      console.log(resp.data.hits, "Priya");
    });

    const interval = setInterval(() => {
      setPageCount((pageCount) => pageCount + 1);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (pageCount > 0) {
      Axios.get(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageCount}`
      ).then((resp) => setPosts([...posts, ...resp.data.hits]));
    }
  }, [pageCount]);

  const getUpdatedData = () => {
    setPageCount(pageCount + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View styles={styles.row}>
        <Text style={styles.col}>Title</Text>
        <Text styles={styles.row}>URL</Text>
        <Text styles={styles.row}>created_at</Text>
        <Text styles={styles.row}>author</Text>
      </View>
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
        keyExtractor={(item) => item.created_at_i}
        onEndReached={getUpdatedData}
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
