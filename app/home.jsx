import React, { useCallback, useEffect, useState } from 'react'
import { View, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Drawer } from 'react-native-drawer-layout';

import { router, useFocusEffect } from 'expo-router'

import ProductCard from '@/components/ProductCard';
import Empty from '@/components/Empty';
import OffCanvas from '@/components/OffCanvas';
import Header from '@/components/Header';

import useAppwrite from "@/lib/useAppwrite";
import { getUserPosts } from "@/lib/appwrite";

import { useGlobalContext } from "@/context/GlobalProvider";
import CustomButton from '@/components/CustomButton';
import Loader from '@/components/Loader';

const Home = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts, refetch, isLoading } = useAppwrite(() => getUserPosts(user.$id));

  const [open, setOpen] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  return (
    <>
      <Drawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        renderDrawerContent={() => {
          return (
            <OffCanvas />
          );
        }}
      >
        <SafeAreaView edges={['top']} className="flex-0 bg-white" />
        <View className="flex-1">
          <Header onOpen={() => setOpen(true)} />
          <FlatList
            data={posts}
            className="bg-gray-100"
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
              <ProductCard
                title={item.title}
                expiration={item.expiration}
                category={item.category}
                image={item.image}
                barcode={item.barcode}
                id={item.$id}
                isLoading={isLoading}
              />
            )}
            ListEmptyComponent={() => (<Empty />)}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
          <CustomButton title="Camera" />
        </View>
      </Drawer>
    </>
  )
}

export default Home