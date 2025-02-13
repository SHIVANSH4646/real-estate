import React, { useState, useEffect } from "react";
import { View, Text, Image, Button, Alert } from "react-native";
import * as Location from "expo-location";

export default function DetailsScreen({ route }) {
  const { home } = route.params;
  const [location, setLocation] = useState(null);
  const [isNearby, setIsNearby] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
      checkProximity(userLocation.coords);
    })();
  }, []);

  const checkProximity = (coords) => {
    const distance = getDistanceFromLatLonInMeters(
      coords.latitude,
      coords.longitude,
      parseFloat(home.latitude),
      parseFloat(home.longitude)
    );
    setIsNearby(distance <= 30);
  };

  const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in meters
    const toRad = (angle) => (angle * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleUnlock = async () => {
    try {
      const response = await fetch("https://your-api.com/unlock", { method: "POST" });
      const result = await response.json();
      Alert.alert("Success", "Home Unlocked!");
    } catch (error) {
      Alert.alert("Error", "Unlock Failed");
    }
  };

  return (
    <View>
      <Image source={{ uri: home.imagerUrl }} style={{ width: 200, height: 200 }} />
      <Text>{home.description}</Text>
      {isNearby && <Button title="Unlock Home" onPress={handleUnlock} />}
    </View>
  );
}