import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const CustomRating = ({ rating }) => {
    // Calculate the number of full and half stars
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Render full stars
    const renderFullStars = () => {
        return Array.from({ length: fullStars }, (_, index) => (
            <Image key={index} source={require("../assets/images/rating/star_full.png")} style={styles.star} />
        ));
    };

    // Render half star if needed
    const renderHalfStar = () => {
        if (hasHalfStar) {
            return <Image source={require("../assets/images/rating/star_half.png")} style={styles.star} />;
        }
        return null;
    };

    return (
        <View style={styles.starRatingContainer}>
            {renderFullStars()}
            {renderHalfStar()}
        </View>
    );
};

const styles = StyleSheet.create({
    starRatingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    star: {
        width: 20, // Adjust the width as needed
        height: 20, // Adjust the height as needed
        marginRight: 2, // Adjust the spacing between stars as needed
    },
});

export default CustomRating;
