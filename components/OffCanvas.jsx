import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useGlobalContext } from '@/context/GlobalProvider';
import { signOut } from '@/lib/appwrite';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import AntDesign from '@expo/vector-icons/AntDesign';

const OffCanvas = () => {
    const { user, setUser, setIsLogged } = useGlobalContext();

    const logout = async () => {
        await signOut();
        setUser(null);
        setIsLogged(false);

        router.replace("/sign-in");
    };
    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 h-full py-3 px-4">
                <View className="flex-col mt-5 bg-white rounded-xl px-3 py-2 space-y-2 items-center">
                    <View className="w-14 h-14 rounded-lg">
                        <Image
                            source={{ uri: user?.avatar }}
                            className="w-full h-full rounded-lg"
                            resizeMode="cover"
                        />
                    </View>
                    <View className="items-center">
                        <Text className="text-xl font-pregular">{user?.username}</Text>
                        <Text className="text-sm font-pregular text-gray-500">{user?.email}</Text>
                    </View>
                </View>
                <View className="h-px bg-gray-300 my-6" />
                <View className="py-3 space-y-2">
                    <View className="flex-row space-x-4 items-center bg-secondary px-3 py-4 rounded-lg">
                        <AntDesign name="home" size={24} color="white" />
                        <Text className="text-lg font-pregular text-white">Home</Text>
                    </View>
                    <View className="flex-row space-x-4 items-center   px-3 py-4 rounded-lg">
                        <AntDesign name="user" size={24} color="black" />
                        <Text className="text-lg font-pregular">Profile</Text>
                    </View>
                    <View className="flex-row space-x-4 items-center   px-3 py-4 rounded-lg">
                        <AntDesign name="setting" size={24} color="black" />
                        <Text className="text-lg font-pregular">Settings</Text>
                    </View>
                </View>
                <View className="h-px bg-gray-300 my-6" />
                <View className="py-3 px-4 space-y-9">
                    <TouchableOpacity className="flex-row space-x-4 items-center" onPress={logout}>
                        <AntDesign name="logout" size={24} color="red" />
                        <Text className="text-lg font-pregular text-red-500">Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default OffCanvas