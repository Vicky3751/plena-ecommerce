import { View, ScrollView, Text, StyleSheet, StatusBar, Image, KeyboardAvoidingView, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react'
import commonStyles from '../styles/styles';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavProduct, setAllCartProducts, setSelectedProduct } from '../store/actions';

const Favourite = (props) => {

  const dispatch = useDispatch()

  const fav = useSelector(state => state.favProducts)
  const cart = useSelector(state => state.cartProducts)

  useEffect(() => {
    console.log(fav)
  }, [fav])



  const goToDetails = (item) => {
    dispatch(setSelectedProduct(item))
    props.navigation.navigate("Product")
  }



  const goToCart = () => {
    props.navigation.navigate("Cart")
  }

  const addToCart = (item) => {
    let payload = {}
    const productExistsInCart = cart?.[item.id]
    if (productExistsInCart) {
      payload = {
        [item.id]: {
          item: item,
          count: cart?.[item.id]?.count + 1
        }
      }
    } else {
      payload = {
        [item.id]: {
          item: item,
          count: 1
        }
      }
    }
    dispatch(setAllCartProducts(payload))
  }

  const removeFromFavourite = (item) => {
    const productExistsInFav = fav.find(product => product.id === item.id)
    if (productExistsInFav) {
      dispatch(removeFavProduct(item))
      ToastAndroid.show('Item removed from wishlist successfully !', ToastAndroid.SHORT);
    }
  }


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust the behavior prop
    >
      <View style={styles.container}>
        <StatusBar backgroundColor="#2A4BA0" barStyle="light-content" />
        {
          fav?.length ?

            <ScrollView contentContainerStyle={styles.scrollContent}>
              <View style={styles.body}>
                <View>
                  <View style={{ marginTop: 24, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={[commonStyles.heading01Regular, { color: '#1E222B' }]}>Favourites</Text>
                    <TouchableOpacity style={styles.cart} onPress={goToCart}>
                      <Image source={require('../assets/images/bag_black.png')} style={styles.headerBagImage} />
                      {
                        Object.keys(cart)?.length ?
                          <Text style={styles.cartCount}>
                            {Object.keys(cart)?.length}
                          </Text>
                          : null
                      }
                    </TouchableOpacity>
                  </View>
                  <View style={styles.homeProductListWrap}>
                    {
                      fav?.map((item, index) => (
                        <TouchableOpacity style={styles.product} key={`product-${index}`} onPress={() => goToDetails(item)}>
                          <View>
                            <Image source={require("../assets/images/image_dummy_4.png")} />
                          </View>
                          <View style={styles.productDetailsWrap}>
                            <View>
                              <Text style={[commonStyles.body02Semibold, { color: "#1E222B" }]} >${item.price}</Text>
                              <Text style={[commonStyles.body02Regular, { color: "#616A7D" }]}>{item.title}</Text>
                            </View>
                            <TouchableOpacity onPress={() => addToCart(item)}>
                              <Image source={require("../assets/images/product_plus.png")} style={{ width: 32, height: 32 }} />
                            </TouchableOpacity>
                          </View>
                          <TouchableOpacity style={styles.favouriteIcon} onPress={() => removeFromFavourite(item)}>
                            <Image source={require("../assets/images/heart_active.png")} style={{ width: 18, height: 16 }} />
                          </TouchableOpacity>
                        </TouchableOpacity>
                      ))
                    }
                  </View>
                </View>
              </View>
            </ScrollView>
            :
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, marginTop: -100, fontFamily: 'Manrope-Bold' }}>
                Your Wishlist is empty
              </Text>
            </View>
        }
      </View>
    </KeyboardAvoidingView>
  )
}

export default Favourite

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 16, // Adjust as needed for padding at the bottom
  },
  homeHeader: {
    backgroundColor: "#2A4BA0",
    height: 230,
    paddingVertical: 12,
    paddingHorizontal: 20,
    paddingTop: 32
  },
  headerBagImage: {
    width: 16,
    height: 18
  },
  introHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    // backgroundColor: 'yellow'
  },
  introHeaderText: {
    color: "#F8F9FB"
  },
  headerDropdownWrapOne: {
    width: '60%',
    justifyContent: 'flex-start'
  },
  headerDropdownWrapTwo: {
    width: '40%',
    justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    marginLeft: 25
  },
  body: {
    padding: 20
  },
  banner: {
    backgroundColor: '#F9B023',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  bannerTextWrap: {
    marginLeft: 24
  },
  bannerTwo: {
    backgroundColor: '#E4DDCB',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  homeProductListWrap: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  product: {
    padding: 20,
    width: "46%",
    margin: '2%',
    borderRadius: 12,
    backgroundColor: '#F8F9FB',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  productDetailsWrap: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 46
  },
  favouriteIcon: {
    position: 'absolute',
    top: 20,
    left: 20
  },
  cart: {
    position: 'relative'
  },
  cartCount: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: "#F9B023",
    color: "#fff",
    borderRadius: 50,
    paddingHorizontal: 8,
    width: 24
  }
});