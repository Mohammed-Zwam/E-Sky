import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../context/ProductsProvider";
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import Modal from "react-native-modal";
const { width } = Dimensions.get("window");

import Product from "../../models/Product";
import TabTitle from "../../components/TabTitle";

export default function TabTwoScreen() {
  const { products, setProducts } = useContext(ProductsContext);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const cart = products.filter((p: Product) => p.cartQuantity > 0);
    setCartProducts(cart);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [products]);

  return (
    <View style={styles.container}>
      <TabTitle title="Shopping Cart" iconName="shopping-cart">
        {
          cartProducts.length > 0 &&
          <View style={{
            paddingLeft: 15,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10
          }}>
            <View style={{
              width: 25,
              height: 25,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: "#000",
              borderRadius: '50%'
            }}>
              <Text style={{ color: '#fff', fontSize: 15 }}>{cartProducts.length}</Text>
            </View>
            <Text style={{ fontSize: 18, fontWeight: 600 }}> items</Text>
          </View>
        }
      </TabTitle>

      <Modal
        isVisible={isVisible}
        onSwipeComplete={() => setIsVisible(false)}
        swipeDirection="down"
        style={{ width: width, margin: 0, zIndex: 10 }}
      >
        <View style={styles.modal}>
          <View style={{ width: 120, borderRadius: 5, height: 4, backgroundColor: '#ddd', margin: "auto", marginTop: 10 }}></View>
        </View>
      </Modal>


      <View style={{ width: "100%", flex: 1, justifyContent: "center", alignItems: "center" }}>
        {
          loading ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: -100 }}>
              <ActivityIndicator size="large" color="black" style={{ transform: 'scale(1.5)' }} />
            </View>
          ) : (
            <View style={{ width: "100%", flex: 1 }}>
              {
                cartProducts.length === 0 ?
                  <View style={{ flex: 1, marginTop: 250 }}>
                    <View style={{
                      display: "flex",
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                    }}>
                      <MaterialIcons name="remove-shopping-cart" size={30} color="black" />
                      <Text style={styles.cartTxt}>No items in cart</Text>
                    </View>

                    <TouchableOpacity
                      style={[styles.btn, styles.flexRow, { gap: 10 }]}
                      onPress={() => router.replace("/(tabs)/products")}
                    >
                      <Text style={{ color: "#fff", textAlign: "center", fontSize: 18 }}>Shop now</Text>
                      <Ionicons name="arrow-redo-outline" size={20} color={'#fff'} />
                    </TouchableOpacity>
                  </View>
                  :
                  <View style={{ width: "100%" }}>
                    <FlatList
                      data={cartProducts}
                      extraData={products}
                      numColumns={1}
                      contentContainerStyle={{
                        gap: 5, padding: 10, paddingBottom: 100,
                      }}
                      keyExtractor={(item) => `#${item.id}`}
                      renderItem={({ item }) => (
                        <View style={styles.card}>
                          <Image source={{ uri: item.thumbnail }} style={{ width: 150, height: 150 }} />
                          <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPressIn={() => {
                            const newProducts = [...products];
                            const idx = newProducts.findIndex(p => p.id === item.id);
                            newProducts[idx] = { ...newProducts[idx], cartQuantity: 0 }
                            setProducts(newProducts);
                          }}>
                            <Ionicons name="trash" size={20} color="red" />
                          </TouchableOpacity>

                          <View style={{ height: 100, flex: 1, flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={[styles.txt, { fontWeight: 600 }]}>{item.title}</Text>

                            <View style={{ width: 100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 50 }}>
                              <Text style={[styles.txt, { fontWeight: 'bold', fontSize: 18 }]}>$ {item.price}</Text>
                              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, backgroundColor: '#ddd', padding: 5, borderRadius: 40 }}>
                                <TouchableOpacity onPressIn={() => {
                                  const newProducts = [...products];
                                  const idx = newProducts.findIndex(p => p.id === item.id);
                                  newProducts[idx] = { ...newProducts[idx], cartQuantity: newProducts[idx].cartQuantity - 1 }
                                  setProducts(newProducts);
                                }} >
                                  <Ionicons name="remove" size={20} color="black" />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 18, fontWeight: 600 }}>{item.cartQuantity}</Text>
                                <TouchableOpacity onPressIn={() => {
                                  const newProducts = [...products];
                                  const idx = newProducts.findIndex(p => p.id === item.id);
                                  newProducts[idx] = { ...newProducts[idx], cartQuantity: newProducts[idx].cartQuantity + 1 }
                                  setProducts(newProducts);
                                }}>
                                  <Ionicons name="add" size={20} color="black" />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>
                      )}
                      ListFooterComponent={() => (
                        <View>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Total:</Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>$ {(cartProducts.reduce((total, cur) => total + (cur.price * cur.cartQuantity), 0)).toFixed(2)}</Text>
                          </View>
                          <TouchableOpacity
                            style={[
                              styles.btn,
                              styles.flexRow,
                              {
                                gap: 10,
                                width: 250,
                                height: 50,
                                borderRadius: 40,
                                alignSelf: "center",
                                marginVertical: 20,
                              },
                            ]}
                            onPress={() => setIsVisible(true)}
                          >
                            <Text style={{ color: "#fff", textAlign: "center", fontSize: 18 }}>
                              Checkout
                            </Text>
                            <Ionicons name="bag-check-outline" size={20} color={"#fff"} />
                          </TouchableOpacity>
                        </View>
                      )}
                    />
                  </View>
              }
            </View>
          )
        }

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
  },
  divider: {
    height: 1,
    backgroundColor: "#aaa",
    marginVertical: 8,
    marginHorizontal: 10
  },
  txt: {
    color: "#000",
    textAlign: "center",
  },
  btn: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#000",
    color: "#fff",
    width: 150,
    margin: "auto",
    marginTop: 20
  },
  cartTxt: {
    color: "#000",
    textAlign: "center",
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "600"
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    paddingTop: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    flexDirection: 'row'
  },

  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2
  },
  modal: {
    backgroundColor: "#000",
    height: 500,
    margin: 0,
    width: '100%',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  }

});