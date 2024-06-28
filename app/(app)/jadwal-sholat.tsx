import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import * as Location from "expo-location";
import axios from "axios";

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

const App: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [city, setCity] = useState<string | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== Location.PermissionStatus.GRANTED) {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const { latitude, longitude } = location.coords;
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse`,
          {
            params: {
              lat: latitude,
              lon: longitude,
              format: "json",
              addressdetails: 1,
            },
          }
        );

        const data = response.data;
        console.log(data.address);

        const cityName =
          data.address.village || data.address.town || data.address.city;
        setCity(cityName);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const getPrayerTimes = async () => {
    if (city) {
      console.log(city);

      //   try {
      //     const response = await axios.get(
      //       `https://api.myquran.com/v1/sholat/jadwal/kota/${city}/tanggal/${
      //         new Date().toISOString().split("T")[0]
      //       }`
      //     );

      //     const data = response.data.data.jadwal;
      //     setPrayerTimes({
      //       Fajr: data.subuh,
      //       Dhuhr: data.dzuhur,
      //       Asr: data.ashar,
      //       Maghrib: data.maghrib,
      //       Isha: data.isya,
      //     });
      //   } catch (error) {
      //     console.error(error);
      //   }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {prayerTimes ? (
        <View>
          <Text>Fajr: {prayerTimes.Fajr}</Text>
          <Text>Dhuhr: {prayerTimes.Dhuhr}</Text>
          <Text>Asr: {prayerTimes.Asr}</Text>
          <Text>Maghrib: {prayerTimes.Maghrib}</Text>
          <Text>Isha: {prayerTimes.Isha}</Text>
        </View>
      ) : (
        <Text>Press the button to get prayer times</Text>
      )}
      <Button title="Get Prayer Times" onPress={getPrayerTimes} />
    </View>
  );
};

export default App;
