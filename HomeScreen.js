import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";

const fetchHomes = async () => {
  const response = await fetch("https://678f678849875e5a1a91b27f.mockapi.io/houses");
  return response.json();
};

export default function HomeScreen({ navigation }) {
  const { data: homes, isLoading } = useQuery({ queryKey: ["homes"], queryFn: fetchHomes });

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View>
      <FlatList
        data={homes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Details", { home: item })}>
            <Image source={{ uri: item.imagerUrl }} style={{ width: 100, height: 100 }} />
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
