import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import Axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import Item from "../components/Item";

export default function Home({ navigation }) {
  const [pageCount, setPageCount] = useState(0);
  const [posts, setPosts] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(
      "https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0"
    ).then((resp) => {
      setPosts(resp.data.hits);
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
      setLoading(true);
      Axios.get(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageCount}`
      ).then((resp) => {
        setPosts([...posts, ...resp.data.hits]);
      });
    }
  }, [pageCount]);

  const getUpdatedData = () => {
    setPageCount(pageCount + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
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
        onEndReached={getUpdatedData}
      />
      {isLoading && <ActivityIndicator />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
});
