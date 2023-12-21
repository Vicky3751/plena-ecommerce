import { View, ScrollView, Text, StyleSheet, StatusBar, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import commonStyles from '../styles/styles';
import CustomInput from '../components/CustomInput';
import CustomDropdown from '../components/CustomDropdown';

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
const Category = (props) => {

  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState(null)
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const onSelectDelivery = (value) => {
    ////console.log(value);
    setSelectedDelivery(value);
  };
  const onSelectDeliveryTime = (value) => {
    ////console.log(value)
    setSelectedDeliveryTime(value)
  }

  const goToDetails = () => {
    props.navigation.navigate("Product")
  }


  const goToCart = () => {
    props.navigation.navigate("Cart")
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust the behavior prop
    >
      <View style={styles.container}>
        <StatusBar backgroundColor="#2A4BA0" barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.body}>
            <View style={{ marginTop: 24, marginBottom: 12 }}>
              <Text style={[commonStyles.heading01Regular, { color: '#1E222B' }]}>Categories</Text>
            </View>
            <View style={styles.bannersWrap}>
              <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
                <View style={styles.banner}>
                  <View>
                    <Image source={require("../assets/images/image_dummy_1.png")} />
                  </View>
                  <View style={styles.bannerTextWrap}>
                    <Text style={[commonStyles.heading03Regular, { color: "#fff" }]}>Men</Text>
                    <Text style={[commonStyles.heading02Bold, { color: "#fff" }]}>Shirts</Text>
                    <Text style={[commonStyles.heading03Regular, { color: "#fff" }]}>100+ Products</Text>
                  </View>
                </View>
                <View style={styles.bannerTwo}>
                  <View>
                    <Image source={require("../assets/images/image_dummy_1.png")} />
                  </View>
                  <View style={styles.bannerTextWrap}>
                    <Text style={[commonStyles.heading03Regular, { color: "#fff" }]}>Women</Text>
                    <Text style={[commonStyles.heading02Bold, { color: "#fff" }]}>Shirts</Text>
                    <Text style={[commonStyles.heading03Regular, { color: "#fff" }]}>100+ Products</Text>
                  </View>
                </View>
                <View style={styles.banner}>
                  <View>
                    <Image source={require("../assets/images/image_dummy_1.png")} />
                  </View>
                  <View style={styles.bannerTextWrap}>
                    <Text style={[commonStyles.heading03Regular, { color: "#fff" }]}>Kids</Text>
                    <Text style={[commonStyles.heading02Bold, { color: "#fff" }]}>Shirts</Text>
                    <Text style={[commonStyles.heading03Regular, { color: "#fff" }]}>100+ Products</Text>
                  </View>
                </View>
                <View style={styles.bannerTwo}>
                  <View>
                    <Image source={require("../assets/images/image_dummy_1.png")} />
                  </View>
                  <View style={styles.bannerTextWrap}>
                    <Text style={[commonStyles.heading03Regular, { color: "#fff" }]}>Women</Text>
                    <Text style={[commonStyles.heading02Bold, { color: "#fff" }]}>Accesories</Text>
                    <Text style={[commonStyles.heading03Regular, { color: "#fff" }]}>100+ Products</Text>
                  </View>
                </View>
                <View style={styles.banner}>
                  <View>
                    <Image source={require("../assets/images/image_dummy_1.png")} />
                  </View>
                  <View style={styles.bannerTextWrap}>
                    <Text style={[commonStyles.heading03Regular, { color: "#fff" }]}>Men</Text>
                    <Text style={[commonStyles.heading02Bold, { color: "#fff" }]}>Accesories</Text>
                    <Text style={[commonStyles.heading03Regular, { color: "#fff" }]}>100+ Products</Text>
                  </View>
                </View>
                <View style={styles.bannerTwo}>
                  <View>
                    <Image source={require("../assets/images/image_dummy_1.png")} />
                  </View>
                  <View style={styles.bannerTextWrap}>
                    <Text style={[commonStyles.heading03Regular, { color: "#fff" }]}>Kids</Text>
                    <Text style={[commonStyles.heading02Bold, { color: "#fff" }]}>Accesories</Text>
                    <Text style={[commonStyles.heading03Regular, { color: "#fff" }]}>100+ Products</Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Category

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
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    marginVertical: 20
  },
  bannerTextWrap: {
    marginLeft: 24
  },
  bannerTwo: {
    backgroundColor: '#2A4BA0',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  homeProductListWrap: {
    flexWrap: 'wrap',
    flexDirection: 'row',
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