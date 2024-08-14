import 'react-native-gesture-handler';
import { Link, Redirect, router } from "expo-router";
import { Image, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from '../constants'

import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import Loader from '@/components/Loader';

export default function Index() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ height: "95%" }}>
        <View className="justify-center items-center px-5 h-full">

          <Image
            source={images.foodBank}
            className="h-72 shadow"
            resizeMode="contain"
          />

          <View className="mt-10 w-full">
            <Text className="text-3xl font-pbold">Stay Fresh with</Text>
            <Text className="text-3xl font-pbold text-secondary">FreshKeeper</Text>
            <Text className="mt-2 text-sm font-pregular text-gray-700">Effortlessly Track Your Goods' Expiration Dates and Stay Organized!</Text>
          </View>

          <CustomButton
            title="Get Started"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-10"
            textStyles="text-white"
          />
        </View>

      </ScrollView>
      
      <StatusBar barStyle="dark-content" backgroundColor="black" />
      <Loader isLoading={loading} />
    </SafeAreaView>
  )
}
