import { Image, KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import commonStyles from '../styles/styles'
import CustomButton from '../components/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartProducts, removeCartProduct, setAllCartProducts, setSelectedProduct } from '../store/actions'

const Cart = (props) => {
  const dispatch = useDispatch()


  const cart = useSelector(state => state.cartProducts)

  const [cartItems, setCartItems] = useState([])
  const [subtotal, setSubTotal] = useState(0)
  const [deliveryCharge, setDeliveryCharge] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (!cart & !Object.values(cart)) return
    setCartItems(Object.values(cart))
  }, [cart])

  useEffect(() => {
    if (!cartItems) return
    //console.log(cartItems)
    const productTotal = cartItems.reduce((acc, cartItem) => {
      const { count, item } = cartItem;
      const subtotal = count * item.price;
      return acc + subtotal;
    }, 0);
    setSubTotal(productTotal)
    setDeliveryCharge(2)
  }, [cartItems])

  useEffect(() => {
    if (!subtotal && !deliveryCharge) return
    setTotal(subtotal + deliveryCharge)
  }, [subtotal, deliveryCharge])




  const increaseCount = (item) => {
    let payload = {}
    const productExistsInCart = cart?.[item.id]
    if (productExistsInCart) {
      payload = {
        [item.id]: {
          item: item,
          count: cart?.[item.id]?.count + 1
        }
      }
      dispatch(setAllCartProducts(payload))
    }
  }

  const decrementCount = (item) => {
    let payload = {}
    const productExistsInCart = cart?.[item.id]
    if (productExistsInCart) {
      if (productExistsInCart?.count > 1) {
        payload = {
          [item.id]: {
            item: item,
            count: cart?.[item.id]?.count - 1
          }
        }
        dispatch(setAllCartProducts(payload))
      } else {
        dispatch(removeCartProduct(item))
      }
    }
  }


  const proceedToCheckout = () => {
    alert("Item Ordered Successfully")
    dispatch(deleteCartProducts())
  }


  const goToDetails = (item) => {
    dispatch(setSelectedProduct(item))
    props.navigation.navigate("Product")
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust the behavior prop
    >
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="light-content" />
        {/* <ScrollView contentContainerStyle={styles.scrollContent}> */}
        <View style={[styles.homeHeader]}>
          <View style={styles.introHeader}>
            <TouchableOpacity style={styles.goBackWrap} onPress={() => props.navigation.goBack()}>
              <Image source={require('../assets/images/chevron_left.png')} style={styles.chevronIcon} />
            </TouchableOpacity>
            <Text style={[commonStyles.body02Regular, { color: "#1E222B" }]}>Shopping Cart ({cartItems?.length ? cartItems?.length : 0})</Text>
          </View>
        </View>
        {
          cartItems?.length ?
            <>
              <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {

                  cartItems?.map((product, index) => (
                    <View style={styles.cartItemWrap} key={`cart-item-${index}`}>
                      <TouchableOpacity style={styles.cartItemInfoWrap} onPress={() => goToDetails(product?.item)}>
                        <View>
                          <Image source={require("../assets/images/image_dummy_3.png")} />
                        </View>
                        <View style={styles.cartItemInfo}>
                          <Text style={[commonStyles.body02Regular, { color: "#1E222B", maxWidth : 175 }]}>{product?.item?.title}</Text>
                          <Text style={[commonStyles.body02Regular, { color: "#1E222B" }]}>${product?.item?.price}</Text>
                        </View>
                      </TouchableOpacity>
                      <View style={styles.cartItemInfoWrap}>
                        <TouchableOpacity style={styles.cartIncrementWrap} onPress={() => decrementCount(product?.item)}>
                          <Image source={require("../assets/images/minus_item.png")} />
                        </TouchableOpacity>
                        <Text style={[commonStyles.body02Regular, { color: "#1E222B", marginHorizontal: 16 }]}>
                          {product?.count}
                        </Text>
                        <TouchableOpacity style={styles.cartIncrementWrap} onPress={() => increaseCount(product?.item)}>
                          <Image source={require("../assets/images/plus_item.png")} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                }
              </ScrollView>


              <View style={styles.cartSummary}>
                <View style={styles.cartBlock}>
                  <Text style={[commonStyles.body02Regular, { color: "#616A7D" }]}>SubTotal</Text>
                  <Text style={[commonStyles.body02Semibold, { color: "#1E222B" }]}>${subtotal}</Text>
                </View>
                <View style={styles.cartBlock}>
                  <Text style={[commonStyles.body02Regular, { color: "#616A7D" }]}>Delivery</Text>
                  <Text style={[commonStyles.body02Semibold, { color: "#1E222B" }]}>${deliveryCharge}</Text>
                </View>
                <View style={styles.cartBlock}>
                  <Text style={[commonStyles.body02Regular, { color: "#616A7D" }]}>Total</Text>
                  <Text style={[commonStyles.body02Semibold, { color: "#1E222B" }]}>${total}</Text>
                </View>
                <View style={{ marginTop: 24 }}>
                  <CustomButton title={'Proceed To checkout'} type={'secondary'} onPress={proceedToCheckout} />
                </View>
              </View>
            </>
            :
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, marginTop: -100, fontFamily: 'Manrope-Bold' }}>
                Your cart looks empty
              </Text>
            </View>
        }
        {/* </ScrollView> */}
      </View >
    </KeyboardAvoidingView >
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 8,
  },
  scrollContent: {
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
    justifyContent: 'start',
    flexDirection: 'row',
    alignItems: 'center'
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
    paddingVertical: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24
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
    right: 0
  },
  cartSummary: {
    borderRadius: 30,
    backgroundColor: '#d9d9d9',
    paddingVertical: 18,
    paddingHorizontal: 36
  },
  cartBlock: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 6
  },
  cartIncrementWrap: {
    backgroundColor: '#F8F9FB',
    padding: 8,
    borderRadius: 50,
    maxWidth: 40,
  },
  cartItemWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBFB",
    paddingVertical: 16
  },
  cartItemInfoWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cartItemInfo: {
    marginLeft: 16,
  }

})