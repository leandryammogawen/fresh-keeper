import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'

import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';

import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import ListPicker from '@/components/ListPicker';
import DatePicker from '@/components/DatePicker';

import { useGlobalContext } from '@/context/GlobalProvider';
import { addProduct, updateProduct, deleteItem } from '@/lib/appwrite';

export default function Create() {
  const param = useRoute().params;
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    expiration: "",
    image: null,
    category: null,
    barcode: param.barcodeData,
  });

  const openPicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setForm({ ...form, image: result.assets[0] });
    }
  };

  const submit = async () => {
    if (form.expiration === "" || form.title === "" || !form.image || !form.category || form.barcode === "") {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);

    try {
      if (param.mode === "update") {
        await updateProduct({ ...form, documentId: param.id, })
        Alert.alert("Success", "Update saved successfully");
      } else {
        await addProduct({ ...form, userId: user.$id, })
        Alert.alert("Success", "Product saved successfully");
      }

      router.back();
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        expiration: "",
        image: null,
        category: null,
        barcode: "",
      });

      setUploading(false);
    }
  };

  const handleDelete = (itemId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this item?",
      [{
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Delete",
        onPress: () => {
          deleteItem(itemId)
          router.back()
        }
      }]
    );
  };

  useEffect(() => {
    if (param.mode === "update") {
      setForm({
        title: param.title,
        expiration: param.expiration,
        image: param.image,
        category: param.category,
        barcode: param.barcode
      });
    }
  }, [])

  return (
    <>
      <SafeAreaView edges={['top']} className="flex-0 bg-white" />
      <View className="flex-1">
        <View className="flex-row bg-white justify-between items-center h-14 px-5">
          <View className="justify-center flex-row">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-xl ml-5 font-psemibold">{param.mode === "update" ? "Update" : "Add"}</Text>
          </View>
          {param.mode === "update" ? (
            <TouchableOpacity onPress={() => handleDelete(param.id)}>
              <Ionicons className="items-end" name="trash-sharp" size={24} color="red" />
            </TouchableOpacity>
          ) : (null)}
        </View>

        <View className="px-5 pt-3">
          <View className="flex-row mt-7 space-x-5 h-52">
            <View className="flex-1">
              <TouchableOpacity onPress={() => openPicker()}>
                {form.image ? (
                  <Image
                    source={{ uri: param.image ? param.image : form.image.uri }}
                    resizeMode="cover"
                    className="w-full h-full rounded-2xl"
                  />
                ) : (
                  <View className="w-full h-full px-4 bg-gray-200 rounded-2xl border-2 border-gray-300 flex justify-center items-center flex-row space-x-2">
                    <Ionicons name="cloud-upload-outline" size={24} color="black" />
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <View className="flex-1">
              <FormField
                title="Barcode"
                value={form.barcode}
                handleChangeText={(e) => setForm({ ...form, barcode: e })}
              />

              <DatePicker
                title="Expiration Date"
                value={param.expiration}
                onDateChange={(e) => setForm({ ...form, expiration: e })}
              />
            </View>
          </View>

          <FormField
            title="Product Name"
            value={form.title}
            handleChangeText={(e) => setForm({ ...form, title: e })}
            otherStyles="mt-7"
          />

          <ListPicker
            title="Category"
            placeholder={param.category || "Snacks, beverages, etc.."}
            value={form.category}
            handleValueChange={(value) => setForm({ ...form, category: value })}
            otherStyles="mt-5"
          />

          <CustomButton
            title={param.mode === "update" ? "Save changes" : "Save item"}
            textStyles="text-white"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={uploading}
          />
        </View>
      </View>
      <SafeAreaView edges={['bottom']} className="flex-0 bg-gray-100" />
    </>
  )
}