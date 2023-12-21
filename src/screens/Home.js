import { View, ScrollView, Text, StyleSheet, StatusBar, Image, KeyboardAvoidingView, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useEffect, useRef, useState } from 'react'
import commonStyles from '../styles/styles';
import CustomInput from '../components/CustomInput';
import CustomDropdown from '../components/CustomDropdown';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavProduct, setAllCartProducts, setAllFavProducts, setAllProducts, setSelectedProduct } from '../store/actions';
import { getAllProductsAPI } from '../utils/api';

const delivery_options = [
    {
        id: 1,
        name: "Green Way 3000, Sylhet"
    },
    {
        id: 2,
        name: "Karnataka, India"
    },
]
const delivery_time_options = [
    {
        id: 1,
        name: "1 Hour"
    },
    {
        id: 2,
        name: "2 Hour"
    },
]
const Home = (props) => {

    const dispatch = useDispatch()
    const scrollViewRef = useRef(null);


    const [selectedDeliveryTime, setSelectedDeliveryTime] = useState(null)
    const [selectedDelivery, setSelectedDelivery] = useState(null);

    const products = useSelector(state => state.products)
    const cart = useSelector(state => state.cartProducts)
    const fav = useSelector(state => state.favProducts)

    const [limit, setLimit] = useState(10)
    const [skip, setSkip] = useState(0)
    const [result, setResult] = useState({})


    useEffect(() => {
        getAllProducts()
    }, [limit, skip])
    const handleNext = () => {
        setSkip(skip + limit);
    };

    const handlePrev = () => {
        setSkip(Math.max(0, skip - limit));
    };

    const handleChangePerPage = (newLimit) => {
        setLimit(newLimit);
        setSkip(0); // Reset skip to the first page when changing items per page
    };

    const onSelectDelivery = (value) => {
        ////console.log(value);
        setSelectedDelivery(value);
    };
    const onSelectDeliveryTime = (value) => {
        ////console.log(value)
        setSelectedDeliveryTime(value)
    }

    const goToDetails = (item) => {
        dispatch(setSelectedProduct(item))
        props.navigation.navigate("Product")
    }


    const goToCart = () => {
        props.navigation.navigate("Cart")
    }


    const getAllProducts = async () => {
        const result = await getAllProductsAPI(limit, skip)
        console.log(result)
        if (result) {
            setResult(result)
            dispatch(setAllProducts(result?.products))
            scrollToTop();
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

    const scrollToTop = () => {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust the behavior prop
        >
            <View style={styles.container}>
                <StatusBar backgroundColor="#2A4BA0" barStyle="light-content" />
                <ScrollView contentContainerStyle={styles.scrollContent} ref={scrollViewRef}>
                    <View style={[styles.homeHeader]}>
                        <View style={styles.introHeader}>
                            <Text style={[commonStyles.headerLegend, styles.introHeaderText]}>Hey, Vicky</Text>

                            <TouchableOpacity style={styles.cart} onPress={goToCart}>
                                <Image source={require('../assets/images/bag_white.png')} style={styles.headerBagImage} />
                                {
                                    Object.keys(cart)?.length ?
                                        <Text style={styles.cartCount}>
                                            {Object.keys(cart)?.length}
                                        </Text>
                                        : null
                                }
                            </TouchableOpacity>
                        </View>
                        <View>
                            <CustomInput placeholder={'Search Products or store'} leftIcon={require('../assets/images/search.png')} />
                        </View>
                        <View style={styles.introHeader}>
                            <View style={styles.headerDropdownWrapOne}>
                                <Text style={[commonStyles.drodownLegend]}>DELIVERY TO</Text>
                                <CustomDropdown options={delivery_options} selectedValue={selectedDelivery} onSelect={onSelectDelivery} />
                            </View>
                            <View style={styles.headerDropdownWrapTwo}>
                                <Text style={[commonStyles.drodownLegend, { marginRight: 16 }]}>WITHIN</Text>
                                <CustomDropdown options={delivery_time_options} selectedValue={selectedDeliveryTime} onSelect={onSelectDeliveryTime} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.bannersWrap}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={styles.banner}>
                                    <View>
                                        <Image source={require("../assets/images/image_dummy_1.png")} />
                                    </View>
                                    <View style={styles.bannerTextWrap}>
                                        <Text style={[commonStyles.heading03Regular, { color: "#fff" }]}>Get</Text>
                                        <Text style={[commonStyles.heading02Bold, { color: "#fff" }]}>50% OFF</Text>
                                        <Text style={[commonStyles.heading03Regular, { color: "#fff" }]}>on first 3 orders</Text>
                                    </View>
                                </View>
                                <View style={styles.bannerTwo}>
                                    <View>
                                        <Image source={require("../assets/images/image_dummy_1.png")} />
                                    </View>
                                    <View style={styles.bannerTextWrap}>
                                        <Text style={[commonStyles.heading03Regular, { color: "#fff" }]}>Get</Text>
                                        <Text style={[commonStyles.heading02Bold, { color: "#fff" }]}>50% OFF</Text>
                                        <Text style={[commonStyles.heading03Regular, { color: "#fff" }]}>on first 3 orders</Text>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        <View>
                            <View style={{ marginTop: 24, marginBottom: 12 }}>
                                <Text style={[commonStyles.heading01Regular, { color: '#1E222B' }]}>Recommended</Text>
                            </View>
                            <View style={styles.homeProductListWrap}>
                                {
                                    products?.map((item, index) => (
                                        <TouchableOpacity style={styles.product} key={`product-${index}`} onPress={() => goToDetails(item)}>
                                            <View>
                                                <Image style={styles.productImage} source={item?.thumbnail ? { uri: item?.thumbnail } : require("../assets/images/image_dummy_4.png")} />
                                            </View>
                                            <View style={styles.productDetailsWrap}>
                                                <View>
                                                    <Text style={[commonStyles.body02Semibold, { color: "#1E222B" }]} >${item.price}</Text>
                                                    <Text style={[commonStyles.body02Regular, { color: "#616A7D", maxWidth: 100 }]}>{item.title}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => addToCart(item)}>
                                                    <Image source={require("../assets/images/product_plus.png")} style={{ width: 32, height: 32 }} />
                                                </TouchableOpacity>
                                            </View>
                                            {fav.some(favItem => favItem.id === item.id) ?
                                                <TouchableOpacity style={styles.favouriteIcon} onPress={() => removeFromFavourite(item)}>
                                                    <Image source={require("../assets/images/heart_active.png")} style={{ width: 18, height: 16 }} />
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity style={styles.favouriteIcon} onPress={() => addToFavourite(item)}>
                                                    <Image source={require("../assets/images/heart_inactive.png")} style={{ width: 18, height: 16 }} />
                                                </TouchableOpacity>
                                            }
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        </View>
                        <View>
                            <View style={[styles.dropdown, { justifyContent: 'space-around' }]}>
                                <TouchableOpacity onPress={handlePrev}><Text style={{ fontSize: 16, fontFamily: 'Manrope-Bold', color: '#2A4BA0' }}>Prev</Text></TouchableOpacity>
                                <View><Text>Page {Math.ceil((skip + 1) / limit)} of {Math.ceil(result.total / limit)}</Text></View>
                                <TouchableOpacity onPress={handleNext}><Text style={{ fontSize: 16, fontFamily: 'Manrope-Bold', color: '#2A4BA0' }}>Next</Text></TouchableOpacity>
                            </View>

                            {/* Dropdown to change items per page */}
                            {/* <View style={styles.dropdown}>
                                <Text>Show:</Text>
                                <TouchableOpacity onPress={() => handleChangePerPage(10)}><Text>10</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => handleChangePerPage(20)}><Text>20</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => handleChangePerPage(50)}><Text>50</Text></TouchableOpacity>
                            </View> */}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Home

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
        marginTop: 16
    },
    favouriteIcon: {
        position: 'absolute',
        top: 25,
        left: 10,
        zIndex: 2,
        backgroundColor: "#fff",
        padding: 4,
        borderRadius: 50
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
    },
    productImage: {
        width: 150,
        height: 100,
        borderRadius: 8
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24,
    },
});