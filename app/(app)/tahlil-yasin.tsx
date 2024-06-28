import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import PagerView from "react-native-pager-view";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { Link } from "expo-router";
import tahlil from "../../data/tahlil.json";
import doaTahlil from "../../data/doa-tahlil.json";
import yasin from "../../data/yasin.json";
import { toArabic } from "@/utils";

const TahlilYasin = () => {
  const { top } = useSafeAreaInsets();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleIndexChange = (index: number) => {
    setSelectedIndex(index);
  };
  return (
    <View style={styles.conatiner}>
      <View style={{ ...styles.statusBar, paddingTop: top }}>
        <Link href={"/"}>
          <FontAwesome name="chevron-left" size={25} color={"white"} />
        </Link>
        <View
          style={{
            flex: 1,
            marginHorizontal: 15,
            backgroundColor: "white",
            borderRadius: 8,
          }}
        >
          <SegmentedControl
            values={["Tahlil", "Yasin"]}
            selectedIndex={selectedIndex}
            onChange={(event) => {
              handleIndexChange(event.nativeEvent.selectedSegmentIndex);
            }}
          />
        </View>
        <Text
          style={{
            color: "white",
            fontSize: 25,
            fontFamily: "SFPro",
            fontWeight: "bold",
          }}
        >
          aA
        </Text>
      </View>
      <View style={styles.content}>
        {selectedIndex === 0 ? (
          //   <ScrollView>
          //     {tahlil.map((item: any) => (
          //       <Text
          //         style={{
          //           writingDirection: "rtl",
          //           fontFamily: "Utsmani",
          //           fontSize: 24,
          //         }}
          //       >
          //         {item.textArab}
          //       </Text>
          //     ))}
          //   </ScrollView>
          <FlatList
            data={tahlil}
            renderItem={({ item }) => (
              <View>
                <Text
                  style={{
                    writingDirection: "rtl",
                    fontFamily: "Utsmani",
                    fontSize: 27,
                    paddingVertical: 20,
                    paddingHorizontal: 15,
                  }}
                >
                  {item.textArab}
                </Text>
                <View
                  style={{
                    height: 1,
                    borderWidth: 1,
                    borderColor: "#ccc",
                  }}
                ></View>
              </View>
            )}
          />
        ) : selectedIndex === 1 ? (
          <FlatList
            data={yasin.verses}
            renderItem={({ item }) => (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    direction: "rtl",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      writingDirection: "rtl",
                      fontFamily: "Utsmani",
                      fontSize: 27,
                      paddingVertical: 20,
                      paddingHorizontal: 15,
                    }}
                  >
                    {item.text.arab}{" "}
                    <Text style={{ fontSize: 32 }}>
                      {toArabic(item.number.inSurah)}
                    </Text>
                  </Text>
                  <Text style={{ paddingRight: 10 }}>
                    <FontAwesome name="ellipsis-v" size={28} />
                  </Text>
                </View>
                <View
                  style={{
                    height: 1,
                    borderWidth: 1,
                    borderColor: "#ccc",
                  }}
                ></View>
              </View>
            )}
          />
        ) : (
          <Text>tab Tahlil</Text>
        )}
      </View>
    </View>
  );
};

export default TahlilYasin;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: "white",
  },
  statusBar: {
    backgroundColor: "#1a9183",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  content: {},
});
