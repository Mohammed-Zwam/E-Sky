import SearchBar from "../../components/SearchBar";
import { ProductsContext } from "../../context/ProductsProvider";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { FlatList, Text, View, ActivityIndicator, Image, TouchableWithoutFeedback, StyleSheet } from "react-native";
import Product from "../../models/Product";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import TabTitle from "../../components/TabTitle";


export default function TabTwoScreen() {
  const { products, setProducts } = useContext(ProductsContext);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch('https://e-sky-server.vercel.app/api/products');
      const { data } = await res.json();
      const products = data;
      setProducts(products);
      setLoading(false);
    }
    getProducts();
  }, [setProducts]);

  const filteredProducts = useMemo(() => {
    return products?.filter((p: Product) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, products]);


  const addProductToCart = (id: number) => {
    const newProducts = [...products];
    const idx = newProducts.findIndex(p => p.id === id);
    newProducts[idx] = { ...newProducts[idx], cartQuantity: newProducts[idx].cartQuantity > 0 ? 0 : 1 }
    setProducts(newProducts);
  }

  return (
    <View style={styles.container}>
      <TabTitle title="Products" iconName="shopify">
        <React.Fragment></React.Fragment>
      </TabTitle>
      {
        loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="black" style={{ transform: 'scale(1.5)' }} />
          </View>
        ) : (
          <View style={{ width: "100%" }}>
            <SearchBar value={query} onChangeText={setQuery} />
            <FlatList
              style={{ width: "100%", paddingTop: 80 }}
              data={filteredProducts}
              extraData={products}
              numColumns={2}
              columnWrapperStyle={{ gap: 5 }}
              contentContainerStyle={{
                gap: 5, padding: 10, paddingBottom: 275,
              }}
              keyExtractor={(item) => `#${item.id}`}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <TouchableWithoutFeedback onPressIn={() => { addProductToCart(item.id) }}>
                    <View style={styles.cartIcon}>
                      <MaterialIcons name="add-shopping-cart" size={24} color={`${item.cartQuantity > 0 ? 'darkorange' : '#aaa'}`} />
                    </View>
                  </TouchableWithoutFeedback >
                  <Image source={{ uri: item.thumbnail }} style={{ width: 200, height: 200 }} />
                  <View>
                    <Text style={styles.txt}>{item.title}</Text>
                    <View style={styles.flexRow}>
                      {[...Array(5)].map((_, i) => (
                        <Ionicons key={i} name="star" size={15} color={i <= Math.floor(item.rating) ? 'darkorange' : '#aaa'} />
                      ))}
                    </View>
                    <Text style={[styles.txt, { marginTop: 10, fontWeight: 'bold', fontSize: 18 }]}>$ {item.price}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        )
      }
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
  txt: {
    color: "#000",
    textAlign: "center",
    marginBottom: 5
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 25,
    paddingBottom: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    color: "#fff"
  },
  cartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    color: '#444',
    backgroundColor: '#ddd',
    borderRadius: "50%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    padding: 5
  },

  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2
  }
});