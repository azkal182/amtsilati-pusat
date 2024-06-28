import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="maulid" options={{ headerShown: false }} />
      <Stack.Screen name="tahlil-yasin" options={{ headerShown: false }} />
      <Stack.Screen name="kiblat" options={{ headerShown: false }} />
      <Stack.Screen name="jadwal-sholat" options={{ headerShown: false }} />
    </Stack>
  );
}
