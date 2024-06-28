import { View, Text } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function maulid() {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View
        style={{
          backgroundColor: "#1a9183",
        }}
      >
        <View style={{ paddingTop: top }}>
          <View
            style={{ padding: 15, flexDirection: "row", alignItems: "center" }}
          >
            <Link href={"/"}>
              <FontAwesome name="chevron-left" size={25} color={"white"} />
            </Link>
            <Text
              style={{
                marginLeft: 15,
                fontSize: 20,
                color: "white",
                fontFamily: "SFPro",
              }}
            >
              Maulid
            </Text>
          </View>
        </View>
      </View>

      <View style={{ padding: 20 }}>
        <View
          style={{
            flexDirection: "row",
            // borderWidth: 1,
            borderRadius: 10,
            // overflow: "hidden",
            alignItems: "center",
            backgroundColor: "white",
            shadowColor: "#171717",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 5,
            marginBottom: 15,
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(26, 145, 131, 0.2)",
              height: "100%",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 15,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          >
            <Text
              style={{
                alignItems: "center",
                color: "#1a9183",
                fontWeight: "bold",
              }}
            >
              1
            </Text>
          </View>
          <View style={{ padding: 15 }}>
            <Text>Maulid</Text>
            <Text>29 Bacaan</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            // borderWidth: 1,
            borderRadius: 10,
            // overflow: "hidden",
            alignItems: "center",
            backgroundColor: "white",
            shadowColor: "#171717",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 5,
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(26, 145, 131, 0.2)",
              height: "100%",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 15,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          >
            <Text
              style={{
                alignItems: "center",
                color: "#1a9183",
                fontWeight: "bold",
              }}
            >
              2
            </Text>
          </View>
          <View style={{ padding: 15 }}>
            <Text>Maulid Berzanji</Text>
            <Text>20 Bacaan</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
