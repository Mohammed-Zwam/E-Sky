import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../context/ProductsProvider";
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import CheckoutModel from "../../components/CheckoutModel";

import Product from "../../models/Product";
import TabTitle from "../../components/TabTitle";


export default function TabTwoScreen() {
  const { products, setProducts } = useContext(ProductsContext);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const cart = products.filter((p: Product) => p.cartQuantity > 0);
    setCartProducts(cart);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [products]);

  useEffect(() => {
    const totalPrice = (cartProducts.reduce((total, cur) => total + (cur.price * cur.cartQuantity), 0)).toFixed(2);
    setTotalPrice(Number(totalPrice));
  }, [cartProducts]);



  const onChangeQuantity = (id: number, quantity: number) => {
    const newProducts = [...products];
    const idx = newProducts.findIndex(p => p.id === id);
    newProducts[idx] = { ...newProducts[idx], cartQuantity: newProducts[idx].cartQuantity + quantity }
    setProducts(newProducts);
  }

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

      <CheckoutModel isVisible={isVisible} setIsVisible={setIsVisible} totalPrice={totalPrice} setCartProducts={setCartProducts} />

      <View style={{ width: "100%", flex: 1, justifyContent: "center", alignItems: "center" }}>
        {
          loading ? (
            <View style={styles.loadingContainer}>
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
                          <Image source={{ uri: item.thumbnail }} style={{ width: 150, height: 180 }} />
                          <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPressIn={() => onChangeQuantity(item.id, item.cartQuantity * -1)}>
                            <Ionicons name="trash" size={20} color="red" />
                          </TouchableOpacity>

                          <View style={{ gap: 40, flex: 1, flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={styles.title}>{item.title}</Text>
                            <View style={{ width: 100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 50 }}>
                              <Text style={styles.price}>$ {item.price}</Text>

                              <View style={styles.productQuantityControlsContainer}>
                                <TouchableOpacity onPressIn={() => onChangeQuantity(item.id, -1)}>
                                  <Ionicons name="remove" size={20} color="black" />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 18, fontWeight: 600 }}>{item.cartQuantity}</Text>
                                <TouchableOpacity onPressIn={() => onChangeQuantity(item.id, 1)}>
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
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: "#000" }}>$ {totalPrice}</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -100
  },
  divider: {
    height: 1,
    backgroundColor: "#aaa",
    marginVertical: 8,
    marginHorizontal: 10
  },
  price: {
    fontWeight: 800,
    fontSize: 18,
    color: "#000",
    textAlign: "center",
  },
  title: {
    fontWeight: 600,
    color: "#000",
    textAlign: "center",
    fontSize: 15
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
    flexDirection: 'row',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2
  },
  productQuantityControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 40
  }

});