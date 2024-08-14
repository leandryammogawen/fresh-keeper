import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'

const FormField = ({ title, placeholder, value, handleChangeText, otherStyles, containerStyles }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`my-2 ${otherStyles}`}>
            <Text className="text-base mb-2">{title}</Text>
            <View className={`w-full h-16 px-4 rounded-2xl border-2 border-gray-200 focus:border-secondary flex-row items-center ${containerStyles}`}>
                <TextInput
                    className="flex-1 text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                />
            </View>
        </View>
    )
}

export default FormField