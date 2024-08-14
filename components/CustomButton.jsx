import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
    return (
        <>
            {title === "Camera" ? (
                <View className="absolute z-20 bottom-0 right-0 m-5 shadow bg-secondary rounded-full p-4 mb-10">
                    <TouchableOpacity onPress={() => router.push('/camera')}>
                        <Ionicons name="camera" size={35} color="white" />
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity
                    onPress={handlePress}
                    activeOpacity={0.5}
                    disabled={isLoading}
                    className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center 
                        ${containerStyles}
                        ${isLoading ? 'opacity-50' : ''}
                    `}
                >
                    <Text className={`font-psemibold text-lg ${textStyles}`}>{title}</Text>
                </TouchableOpacity>
            )}
        </>
    )
}

export default CustomButton