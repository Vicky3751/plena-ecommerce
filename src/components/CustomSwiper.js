import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';

const CustomSwiper = ({ slides }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    //console.log(slides)
    const handleIndexChanged = (index) => {
        setActiveIndex(index);
    };

    return (
        <View style={styles.container}>
            <Swiper
                showsPagination={false}
                loop={true}
                showsButtons={false}
                onIndexChanged={handleIndexChanged}
                autoplay={true}
            >
                {slides?.map((slide, index) => (
                    <View key={index} style={styles.slide}>
                        <Image source={{ uri: slide }} style={styles.swiperSlideImage} />
                    </View>
                ))}
            </Swiper>
            <View style={styles.navigationDots}>
                {slides?.map((_, index) => (
                    <View
                        key={index}
                        style={[styles.dot, index === activeIndex && styles.activeDot]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 250,
        // backgroundColor: 'yellow'
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderRadius: 8

    },
    navigationDots: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 24
    },
    dot: {
        height: 4,
        width: 15,
        backgroundColor: 'gray',
        margin: 3,
    },
    activeDot: {
        backgroundColor: 'yellow',
    },
    swiperSlideImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        // objectFit: 'scale-down'
    }
});

export default CustomSwiper;
