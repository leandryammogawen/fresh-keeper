import { View, Text, Image } from 'react-native'
import React from 'react'

import { images } from '@/constants'

import AntDesign from '@expo/vector-icons/AntDesign';

const Empty = () => {
    return (
        <View className="flex-1 justify-center items-center min-h-[70vh]">
            <Image
                source={images.emptyBasket}
                resizeMode='contain'
                className="h-72 shadow"
            />
            <Text className="text-2xl font-psemibold">Oops, Nothing Here Yet!</Text>
            <View className="flex-row mt-2 justify-center items-center">
                <Text className="text-sm font-pregular text-gray-700 pr-1">Tap on </Text>
                <AntDesign name="pluscircle" color="#798C8C" size={17} />
                <Text className="text-sm font-pregular text-gray-700 pl-1">add products.</Text>
            </View>

        </View>
    )
}

export default Empty