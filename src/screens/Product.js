import { Image, KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import commonStyles from '../styles/styles'
import CustomButton from '../components/CustomButton'
import CustomSwiper from '../components/CustomSwiper'
import { useDispatch, useSelector } from 'react-redux'
import { removeFavProduct, setAllCartProducts, setAllFavProducts } from '../store/actions'
import CustomRating from '../components/CustomRating'

const Product = (props) => {

  const dispatch = useDispatch()

  const product = useSelector(state => state.selectedProduct)
  const cart = useSelector(state => state.cartProducts)
  const fav = useSelector(state => state.favProducts)

  useEffect(() => {
    //console.log(product)
  }, [product])


  const goToCart = () => {
    props.navigation.navigate("Cart")
  }

  const slides = [
    { image: require("../assets/images/image_dummy_4.png") },
    { image: require("../assets/images/image_dummy_4.png") },
    { image: require("../assets/images/image_dummy_4.png") },
    { image: require("../assets/images/image_dummy_4.png") },
  ]

  const addToFavourite = (item) => {
    const productExistsInFav = fav.find(product => product.id === item.id)
    if (productExistsInFav) {
      return
    } else {
      dispatch(setAllFavProducts(item))
      ToastAndroid.show('Item added to wishlist successfully !', ToastAndroid.SHORT);
    }

  }

  const removeFromFavourite = (item) => {
    const productExistsInFav = fav.find(product => product.id === item.id)
    if (productExistsInFav) {
      dispatch(removeFavProduct(item))
      ToastAndroid.show('Item removed from wishlist successfully !', ToastAndroid.SHORT);
    }
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
    ToastAndroid.show('Item added to cart successfully !', ToastAndroid.SHORT);
  }


  const buyNow = (item) => {
    const productExistsInCart = cart?.[item.id]
    if (productExistsInCart) {
      props.navigation.navigate("Cart")
    } else {
      addToCart(item)
      props.navigation.navigate("Cart")
    }

  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust the behavior prop
    >
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={[styles.homeHeader]}>
            <View style={styles.introHeader}>
              <TouchableOpacity style={styles.goBackWrap} onPress={() => props.navigation.goBack()}>
                <Image source={require('../assets/images/chevron_left.png')} style={styles.chevronIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.cart, { padding: 20 }]} onPress={goToCart}>
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
          </View>
          <View>
            <Text style={[commonStyles.legend01Semibold, { color: "#1E222B" }]} >{product?.brand}</Text>
            <Text style={[commonStyles.legend01Bold, { color: "#1E222B" }]} >{product?.title}</Text>
          </View>
          <View style={styles.ratingWrap}>
            <CustomRating rating={product?.rating}/>
            <Text style={[commonStyles.body02Regular, { color: "#A1A1AB" }]} >{product?.rating} Rating</Text>
          </View>
          <View style={styles.carousal}>
            {/* <Image source={{uri : product?.thumbnail}} width={500} height={500} /> */}
            <CustomSwiper slides={product?.images} />
            {fav.some(favItem => favItem.id === product.id) ?
              <TouchableOpacity style={styles.heartWrap} onPress={() => removeFromFavourite(product)}>
                <Image source={require("../assets/images/heart_active.png")} />
              </TouchableOpacity>
              :
              <TouchableOpacity style={styles.heartWrap} onPress={() => addToFavourite(product)}>
                <Image source={require("../assets/images/heart_inactive.png")} />
              </TouchableOpacity>
            }
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[commonStyles.body01Bold, { color: "#2A4BA0", textDecorationLine: product?.discountPercentage ? 'line-through' : 'none' }]} >${product?.price}</Text >
            </View>
            {
              product?.discountPercentage ?
                <View style={styles.offerPill}>
                  <Text style={[commonStyles.labelRegular, { color: "#FAFBFD" }]} >${(product?.price - (product?.price * (product?.discountPercentage / 100))).toFixed(2)}</Text>
                </View>
                : null
            }
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 32 }}>
            <View style={styles.buttonContainer}>
              <CustomButton title={"Add To Cart"} type={'primary'} onPress={() => addToCart(product)}></CustomButton>
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton title={"Buy Now"} type={'secondary'} onPress={() => buyNow(product)}></CustomButton>
            </View>
          </View>
          <View style={styles.description}>
            <Text style={[commonStyles.body01Medium, { color: "#1E222B" }]} >Details</Text>
            <Text style={[commonStyles.body02Regular, { color: "#8891A5" }]}>{product?.description}</Text>
          </View>
        </ScrollView>
      </View >
    </KeyboardAvoidingView >
  )
}

export default Product

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 16, // Adjust as needed for padding at the bottom
  },
  homeHeader: {
    paddingVertical: 12,
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
  cart: {
    position: 'relative'
  },
  cartCount: {
    position: 'absolute',
    top: 12,
    right: 8,
    backgroundColor: "#F9B023",
    color: "#fff",
    borderRadius: 50,
    paddingHorizontal: 8,
    width: 24
  },
  goBackWrap: {
    borderRadius: 40,
    backgroundColor: "#F8F9FB",
    paddingHorizontal: 28,
    justifyContent: 'center',
    alignItems: 'center'
  },
  description: {
    marginTop: 30
  },
  ratingWrap: {
    flexDirection: 'row',
    marginVertical: 18
  },
  buttonContainer: {
    width: '46%'
  },
  offerPill: {
    borderRadius: 70,
    backgroundColor: "#2A4BA0",
    paddingVertical: 4,
    marginLeft: 16,
    paddingHorizontal: 10
  },
  carousal: {
    position: 'relative',
  },
  heartWrap: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor : "#fff",
    padding : 8,
    borderRadius : 50
  }

})