import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import TabTitle from "../../components/TabTitle";
import React from "react";
import Swiper from "react-native-swiper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
export default function HomeScreen() {
  const images = [
    require("../../assets/images/slider1.jpg"),
    require("../../assets/images/slider2.jpg"),
    require("../../assets/images/slider3.jpg")
  ];
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#000", height: 450, width: "100%" }}>
        <TabTitle title="E-Sky" iconName="E-Sky"><React.Fragment></React.Fragment></TabTitle>
        <View style={{ height: 200, marginTop: 20 }}>
          <Swiper
            autoplay={true}
            autoplayTimeout={3}
            showsPagination={true}
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
          >
            {images.map((item, index) => (
              <View key={index} style={styles.slide}>
                <Image source={item} style={styles.image} />
              </View>
            ))}
          </Swiper>
        </View>
        <View style={styles.shape}>
          <Features />
          <Categories />
        </View>
      </View>
    </View>
  );
}

function Features() {
  const features = [
    {
      label: 'Easy',
      icon: require("../../assets/images/easy.png")
    },
    {
      label: 'Fast',
      icon: require("../../assets/images/fast.png")
    },
    {
      label: 'Smart',
      icon: require("../../assets/images/smart.png")
    },
    {
      label: 'Safe',
      icon: require("../../assets/images/safe.png")
    }
  ]
  return (
    <View style={styles.featuresContainer}>
      {
        features.map((item, index) => (
          <View key={index} style={styles.feature}>
            <Image source={item.icon} style={{ width: 30, height: 30 }} />
            <Text style={{ fontWeight: 600 }}>{item.label}</Text>
          </View>
        ))
      }
    </View >
  );
}

function Categories() {
  const categories = [
    {
      label: 'Electronics',
      icon: <Ionicons name="phone-portrait-outline" size={24} color="#fff" />
    },
    {
      label: 'Kitchen',
      icon: <MaterialIcons name="kitchen" size={30} color="#fff" />
    },
    {
      label: 'Clothes',
      icon: <Ionicons name="shirt-outline" size={30} color="#fff" />
    },
    {
      label: 'Watches',
      icon: <Ionicons name="time-outline" size={30} color="#fff" />
    },
    {
      label: 'Fashion',
      icon: <Ionicons name="bag-outline" size={30} color="#fff" />
    },
    {
      label: 'Automotive',
      icon: <Ionicons name="car-outline" size={30} color="#fff" />
    },
  ];
  return (
    <View>
      <Text style={{ fontSize: 25, fontWeight: 900, marginLeft: 20, marginTop: 15 }}>Categories</Text>
      <View style={{ width: 50, height: 4, backgroundColor: "#000", marginLeft: 25, marginBottom: 20, paddingTop: 5, marginTop: 5 }}></View>
      <View style={styles.categoriesContainer}>
        {
          categories.map((item, index) => (
            <View key={index} style={styles.card}>
              {item.icon}
              <Text style={{ fontWeight: 600, color: '#fff' }}>{item.label}</Text>
            </View>
          ))
        }
      </View >
      <Text style={{ fontSize: 20, fontWeight: 900, marginTop: 15, textAlign: 'center' }}>And more, Discover Now!</Text>
    </View >
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
  },
  slide: {
    flex: 1,
    width: width,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderRadius: 30,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  dot: {
    backgroundColor: "#999",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: "#fff",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  shape: {
    backgroundColor: "#ddd",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    height: 200,
    marginTop: 50
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    margin: 20,
    marginBottom: 0,
    borderRadius: 10,
    marginTop: -30,
    boxShadow: "0px 0px 10px 0px #555"
  },
  feature: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 5
  },

  categoriesContainer: {
    flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
    alignItems: "center",
    gap: 12
  },
  card: {
    borderRadius: 10,
    boxShadow: "0px 2px 6px 2px #444",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#000',
    width: 140,
    padding: 10,
    gap: 8,
    height: 80
  }
})


