import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import GridView from "@/components/GridView";

const menuItems = [
  {
    title: "Al-Qur'an",
    icon: require("../../assets/images/menu/quran.png"),
    link: "/quran",
  },
  {
    title: "Wirid & Do'a",
    icon: require("../../assets/images/menu/doa.png"),
    link: "/doa",
  },
  {
    title: "Jadwal Sholat",
    icon: require("../../assets/images/menu/jam.png"),
    link: "/jadwal-sholat",
  },
  {
    title: "Kiblat",
    icon: require("../../assets/images/menu/kabah.png"),
    link: "/kiblat",
  },
  {
    title: "Tahlil & yasin",
    icon: require("../../assets/images/menu/sholat.png"),
    link: "/tahlil-yasin",
  },
  {
    title: "Maulid",
    icon: require("../../assets/images/menu/maulid.png"),
    link: "/maulid",
  },
  {
    title: "Zakat & Sedekah",
    icon: require("../../assets/images/menu/zakat.png"),
    link: "/zakat-sedekah",
  },
  {
    title: "Lainnya",
    icon: require("../../assets/images/menu/lain.png"),
    link: "/lainnya",
  },
];

const Divider = ({ style }: { style: any }) => {
  return (
    <View
      style={{
        ...style,
        height: 1, // Tinggi divider
        backgroundColor: "#ddd", // Warna divider
        marginVertical: 10, // Margin atas dan bawah divider
      }}
    />
  );
};

const Index = () => {
  const { top } = useSafeAreaInsets();
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          ...styles.header,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../assets/images/amtsilati.png")}
          resizeMode="contain"
          style={{
            width: 100,
            height: 50,
          }}
        />
        <Text
          style={{
            marginTop: 10,
            fontSize: 24,
            fontWeight: "bold",
            fontFamily: "SFPro",
          }}
        >
          Subuh, 04:45 Wib
        </Text>
        {/* <Text>Amtsilati</Text> */}
      </View>
      <View style={styles.menuContainer}>
        <View style={styles.menuWrapper}>
          <GridView
            data={menuItems}
            col={4}
            renderItem={(item) => (
              <View key={item.title} style={styles.menuItem}>
                <Link href={item.link}>
                  <View
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <View
                        style={{
                          overflow: "hidden",
                          width: 40,
                          aspectRatio: 1,
                          backgroundColor: "#D6FFFA",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 25,
                        }}
                      >
                        <Image
                          source={item.icon}
                          resizeMode="contain"
                          style={{ aspectRatio: 1, width: 30, height: 30 }}
                        />
                      </View>
                    </View>
                    <Text
                      style={{
                        textAlign: "center",
                        marginTop: 3,
                        color: "#303030",
                        fontFamily: "SFPro",
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                </Link>
              </View>
            )}
          />
        </View>
        <View
          style={{
            backgroundColor: "#ddd",
            height: 45,
            borderRadius: 10,
            marginTop: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Search
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 10,
          backgroundColor: "white",
          //   height: 1000,
          padding: 20,
        }}
      >
        {/* headlie */}
        <View
          style={{
            paddingHorizontal: 10,
            borderLeftWidth: 2,
            borderLeftColor: "#baaf4e",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              fontFamily: "SFPro",
            }}
          >
            Headline
          </Text>
          <FontAwesome name="chevron-right" />
        </View>

        <Divider style={{ width: "100%" }} />
        {/* content */}
        {Array.from({ length: 5 }).map((_, index) => (
          <View key={index}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flex: 3,
                  height: 100,
                  marginHorizontal: 5,
                }}
              >
                <Text
                  style={{
                    backgroundColor: "#1a9183",
                    color: "white",
                    paddingHorizontal: 10,
                    alignSelf: "flex-start",
                    fontSize: 12,
                    borderRadius: 5,
                    marginVertical: 5,
                    fontFamily: "SFPro",
                  }}
                >
                  Nasional
                </Text>

                <Text
                  numberOfLines={3}
                  style={{
                    lineHeight: 18,
                    fontWeight: "500",
                    color: "#303030",
                    fontFamily: "SFPro",
                  }}
                >
                  Lorem ipsum dolor sit. Doloribus, enim mollitia accusamus
                  repudiandae odit, blanditiis, soluta dolorem nihil fugiat
                  cumque
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "yellow",
                  flex: 1,
                  aspectRatio: 1,
                  width: 50,
                  borderRadius: 10,
                  overflow: "hidden",
                  marginHorizontal: 5,
                }}
              >
                <Image
                  source={require("../../assets/images/kabah.jpg")}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            </View>
            <Divider style={{ width: "100%" }} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    fontFamily: "SFPro",
    flex: 1,
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#1a9183",
    height: 200,
  },
  menuContainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "white",
    marginTop: -20,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  menuWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    // maxHeight: 130,
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
  },
});
