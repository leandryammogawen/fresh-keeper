import React, { useState, useEffect } from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'

import { CameraView, Camera } from "expo-camera";
import { router } from "expo-router";

import Ionicons from '@expo/vector-icons/Ionicons';

export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const BARCODE_TYPES = [
        'aztec', 'ean13', 'ean8', 'qr', 'pdf417',
        'upc_e', 'datamatrix', 'code39', 'code93',
        'itf14', 'codabar', 'code128', 'upc_a'
    ];

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getCameraPermissions();
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);

        router.replace({
            pathname: '/create',
            params: { barcodeData: data }
        })
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const generateRandomBarcode = (length = 12) => {
        let barcode = '';
        const characters = '0123456789';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            barcode += characters[randomIndex];
        }

        router.replace({
            pathname: '/create',
            params: { barcodeData: barcode }
        })
    };

    return (
        <>
            <SafeAreaView edges={['top']} className="flex-0 bg-black" />
            <View className="flex-row h-14 bg-black justify-between items-center px-3">
                <TouchableOpacity className="flex-row items-center space-x-5" onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                    <Text className="text-lg font-psemibold text-white">Scan Product</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-white rounded-full px-3" onPress={() => generateRandomBarcode()}>
                    <Text className="text-lg font-psemi text-black">Add Manually</Text>
                </TouchableOpacity>
            </View>
            <CameraView
                className='h-full'
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: BARCODE_TYPES,
                }}
            />
            {scanned && (
                <Button
                    title={"Tap to Scan Again"}
                    onPress={() => setScanned(false)}
                />
            )}
        </>

    )
}