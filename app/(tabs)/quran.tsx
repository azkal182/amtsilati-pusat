import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { Link } from "expo-router";
import axios from "axios";
import { toArabic } from "@/utils";
import { getListSurahs } from "@/helper/quran";

const QuranPage = () => {
  const { top } = useSafeAreaInsets();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [surah, setSurah] = useState([]);
  const listSurah = getListSurahs();

  const handleIndexChange = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingTop: top,
          paddingBottom: 20,
          backgroundColor: "#29978A",
        }}
      >
        <View
          style={{
            padding: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
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
              Al-Quran
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <FontAwesome size={26} name="bookmark" color={"#fff"} />
            <FontAwesome size={26} name="gear" color={"#fff"} />
            <Pressable
              style={{
                flexDirection: "row",
                gap: 2,
                alignItems: "center",
                borderWidth: 1,
                paddingHorizontal: 8,
                paddingVertical: 6,
                borderRadius: 8,
                borderColor: "white",
              }}
              onPress={() => {}}
            >
              <FontAwesome size={26} name="search" color={"#fff"} />
              <Text style={{ color: "white" }}>Cari</Text>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 8,
            marginHorizontal: 15,
          }}
        >
          <SegmentedControl
            values={["Surah", "Juz"]}
            selectedIndex={selectedIndex}
            onChange={(event) => {
              handleIndexChange(event.nativeEvent.selectedSegmentIndex);
            }}
          />
        </View>
      </View>
      <View
        style={{
          padding: 24,
        }}
      >
        {selectedIndex === 0 ? (
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 3,
                backgroundColor: "#f0f0f0",
                borderRadius: 10,
              }}
            >
              <FontAwesome
                name="search"
                size={20}
                color="#6B7280"
                style={{ marginRight: 5 }}
              />
              <TextInput
                placeholder="Cari Nama Surah"
                style={{
                  flex: 1,
                  height: 40,
                  backgroundColor: "#f0f0f0",
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  fontSize: 16,
                }}
              />
            </View>
            <ScrollView style={{ marginVertical: 15 }}>
              {listSurah?.map((item: any, index: number) => (
                <View key={item.number}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      gap: 10,
                      paddingVertical: 5,
                    }}
                  >
                    <Text style={{ fontSize: 32, fontFamily: "Utsmani" }}>
                      {toArabic(item.number)}
                    </Text>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          //   fontWeight: "400",
                          fontSize: 16,
                          fontFamily: "SFPro",
                        }}
                      >
                        {item.surahName.transliteration.id}
                      </Text>
                      <Text
                        style={{
                          color: "brown",
                          fontFamily: "SFPro",
                          fontSize: 12,
                          marginTop: 2,
                        }}
                      >{`${item.surahName.translation.id} (${item.numberOfAyahs} ayat)`}</Text>
                    </View>
                    <Text style={{ fontFamily: "SurahNames", fontSize: 20 }}>
                      {item.surahName.short}
                    </Text>
                  </View>
                  {index < listSurah.length - 1 && (
                    <View
                      style={{
                        height: 1,
                        backgroundColor: "#ccc",
                        marginVertical: 5,
                      }}
                    />
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        ) : selectedIndex === 1 ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
              paddingVertical: 3,
              backgroundColor: "#f0f0f0",
              borderRadius: 10,
            }}
          >
            <FontAwesome
              name="search"
              size={20}
              color="#6B7280"
              style={{ marginRight: 5 }}
            />
            <TextInput
              placeholder="Cari Juz"
              style={{
                flex: 1,
                height: 40,
                backgroundColor: "#f0f0f0",
                borderRadius: 10,
                paddingHorizontal: 10,
                fontSize: 16,
              }}
            />
          </View>
        ) : (
          <Text>{selectedIndex}</Text>
        )}
      </View>
    </View>
  );
};

export default QuranPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabsContainerStyle: {
    marginHorizontal: 20,
  },
  tabStyle: {
    borderColor: "#d9d8d7",
    borderWidth: 3,
    backgroundColor: "#d9d8d7",
  },
  tabTextStyle: {
    color: "#333",
  },
  activeTabStyle: {
    backgroundColor: "#fff",
  },
  activeTabTextStyle: {
    color: "#000",
  },
});
