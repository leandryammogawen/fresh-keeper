import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'

import moment from 'moment';

import { router } from 'expo-router';

const calculateExpiration = (expiration) => {
    const expirationDate = new Date(expiration);
    const today = new Date();

    // Normalize times to midnight for accurate day difference
    today.setHours(0, 0, 0, 0);
    expirationDate.setHours(0, 0, 0, 0);

    // Calculate the difference in time
    const diffTime = expirationDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let message;
    let className;

    if (diffDays < 0) {
        // Expired
        message = "Expired";
        className = 'bg-red-500';
    } else if (diffDays === 1) {
        // 1 day left
        message = "1 day left";
        className = 'bg-orange-500';
    } else if (diffDays <= 10) {
        // 10 days or less
        message = `${diffDays} days left`;
        className = 'bg-orange-500';
    } else {
        // More than 10 days
        message = `${diffDays} days left`;
        className = 'bg-green-500';
    }

    return {
        message,
        className
    };
};

const ProductCard = ({ title, expiration, category, image, barcode, id }) => {
    const formattedDate = moment(expiration).format('MMMM D, YYYY');
    const { message, className } = calculateExpiration(expiration);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleLoadStart = () => {
        setLoading(true);
    };

    const handleLoad = () => {
        setLoading(false);
        setError(false);
    };

    const handleError = () => {
        setLoading(false);
        setError(true);
    };

    return (
        <View className="mx-3 mb-3 shadow">
            <View className="flex-row justify-between items-center py-4">
                <View className={`px-3 py-1 rounded-full ${className}`}>
                    <Text className="text-white font-semibold font-pregular">{message}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => router.push({
                pathname: '/create',
                params: { mode: "update", title: title, expiration: expiration, category: category, image: image, barcode: barcode, id: id }
            })}>
                <View className="flex-row bg-white px-3 py-3 rounded-lg h-36">
                    <View className="bg-blue-200 w-28 h-full">
                        {loading && !error && (
                            <View className="absolute justify-center items-center z-10">
                                <ActivityIndicator size="large" color="#0000ff" />
                                <Text className="text-blue-500">Loading image...</Text>
                            </View>
                        )}
                        {error && (
                            <View className="absolute justify-center items-center z-10">
                                <Text className="text-red-500">Failed to load image</Text>
                            </View>
                        )}
                        <Image
                            source={{ uri: image }}
                            className="w-full h-full"
                            resizeMode='cover'
                            onLoadStart={handleLoadStart}
                            onLoad={handleLoad}
                            onError={handleError}
                        />
                    </View>
                    <View className="flex-1 pl-4">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-gray-600 font-pregular">{formattedDate}</Text>
                            <View className="p-1 bg-gray-100 rounded bg-rounded-lg">
                                <Text className="text-gray-600 font-pregular">{category}</Text>
                            </View>
                        </View>
                        <Text className="text-xl font-pregular">{title}</Text>
                        <View className="flex-1 justify-end">
                            <Text className="text-gray-600 font-pregular">{barcode}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ProductCard