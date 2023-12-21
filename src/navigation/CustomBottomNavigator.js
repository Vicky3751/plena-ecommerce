import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../screens/Home';
import Category from '../screens/Category';
import Favourite from '../screens/Favourite';
import More from '../screens/More';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const CustomBottomNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#F8F7FB",
                    height: 80,
                    borderTopLeftRadius: 30,
                    borderTopEndRadius: 30,
                    paddingHorizontal: 15
                },
                tabBarHideOnKeyboard: true
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color, focused }) => (
                        <View style={{
                            backgroundColor: focused ? "#1E222B" : "fff", padding: 20,
                            borderRadius: 50,
                            marginTop: focused ? -30 : 0,
                            borderWidth: focused ? 7 : 0,
                            borderColor: '#fff'
                        }}>
                            <Image
                                source={focused ? require('../assets/images/menu/home_active.png') : require('../assets/images/menu/home_inactive.png')}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Category"
                component={Category}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color, focused }) => (
                        <View style={{
                            backgroundColor: focused ? "#1E222B" : "fff", padding: 20,
                            borderRadius: 50,
                            marginTop: focused ? -30 : 0,
                            borderWidth: focused ? 7 : 0,
                            borderColor: '#fff'
                        }}>
                            <Image
                                source={focused ? require('../assets/images/menu/category_active.png') : require('../assets/images/menu/category_inactive.png')}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Favourite"
                component={Favourite}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color, focused }) => (
                        <View style={{
                            backgroundColor: focused ? "#1E222B" : "fff", padding: 20,
                            borderRadius: 50,
                            marginTop: focused ? -30 : 0,
                            borderWidth: focused ? 7 : 0,
                            borderColor: '#fff'
                        }}>
                            <Image
                                source={focused ? require('../assets/images/menu/heart_active.png') : require('../assets/images/menu/heart_inactive.png')}
                            />
                        </View>
                    ),
                }}
            />
            < Tab.Screen
                name="More"
                component={More}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color, focused }) => (
                        <View style={{
                            backgroundColor: focused ? "#1E222B" : "fff", padding: 20,
                            borderRadius: 50,
                            marginTop: focused ? -30 : 0,
                            borderWidth: focused ? 7 : 0,
                            borderColor: '#fff'
                        }}>
                            <Image
                                source={focused ? require('../assets/images/menu/more_active.png') : require('../assets/images/menu/more_inactive.png')}
                            />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator >
    )
}

export default CustomBottomNavigator

const styles = StyleSheet.create({})