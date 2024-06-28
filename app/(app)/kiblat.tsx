import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Magnetometer } from "expo-sensors";
import * as Location from "expo-location";

const { width } = Dimensions.get("window");

const Kiblat = () => {
  const [magnetometerData, setMagnetometerData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [qiblaDirection, setQiblaDirection] = useState(0);

  useEffect(() => {
    Magnetometer.setUpdateInterval(30); // Update interval in milliseconds
    const subscription = Magnetometer.addListener((data) => {
      setMagnetometerData(data);
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const qiblaDir = calculateQiblaDirection(
        location.coords.latitude,
        location.coords.longitude
      );
      setQiblaDirection(qiblaDir);
    })();
  }, []);

  const calculateDirection = () => {
    let { x, y } = magnetometerData;
    let angle = Math.atan2(y, x);
    let degree = angle * (180 / Math.PI);

    if (degree < 0) {
      degree = 360 + degree;
    }

    return Math.round(degree);
  };

  const calculateQiblaDirection = (latitude: any, longitude: any) => {
    const A = 21.4226514 * (Math.PI / 180.0);
    const B = 39.8269916 * (Math.PI / 180.0);
    const C = latitude * (Math.PI / 180.0);
    const D = longitude * (Math.PI / 180.0);

    const direction =
      (180.0 / Math.PI) *
      Math.atan2(
        Math.sin(B - D),
        Math.cos(C) * Math.tan(A) - Math.sin(C) * Math.cos(B - D)
      );
    const qiblah = direction < 0 ? direction + 360 : direction;

    return Math.round(qiblah);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Kompas</Text>
      <View style={styles.compassContainer}>
        <Image
          source={require("../../assets/kompas/compass_bg.png")}
          style={{
            width: width * 0.8,
            height: width * 0.8,
            transform: [{ rotate: `${360 - calculateDirection() + 90}deg` }],
          }}
        />
        <Image
          source={require("../../assets/kompas/compass.png")}
          resizeMode="cover"
          style={[
            styles.pointer,
            {
              transform: [
                { rotate: `${qiblaDirection - calculateDirection() + 90}deg` },
              ],
            },
          ]}
        />
      </View>
      <Text style={styles.degree}>{calculateDirection()}°</Text>
      <Text style={styles.qibla}>Arah Kiblat: {qiblaDirection}°</Text>
    </View>
  );
};

export default Kiblat;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  compassContainer: {
    width: width * 0.8,
    height: width * 0.8,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  pointer: {
    position: "absolute",
    height: "100%",
    width: 40,
  },
  degree: {
    fontSize: 64,
    color: "red",
    marginTop: 20,
  },
  qibla: {
    fontSize: 24,
    color: "blue",
    marginTop: 10,
  },
});
