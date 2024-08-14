import { View, Text } from 'react-native'
import React from 'react'

import RNPickerSelect from 'react-native-picker-select';

const ListPicker = ({ title, value, placeholder, handleValueChange, otherStyles }) => {
    const groceryCategories = [
        { label: 'Food', value: 'Food' },
        { label: 'Beverage', value: 'Beverage' },
        { label: 'Health', value: 'Health' },
        { label: 'Personal Care', value: 'Personal Care' },
        { label: 'Household', value: 'Household' }
    ];

    return (
        <View className={`my-2 ${otherStyles}`}>
            <Text className="text-base mb-2">{title}</Text>
            <RNPickerSelect
                onValueChange={handleValueChange}
                items={groceryCategories}
                placeholder={{ label: placeholder, value: !value ? null : value }}
                style={{
                    inputIOS: {
                        width: '100%',
                        height: 64,
                        paddingHorizontal: 16,
                        borderRadius: 16,
                        borderWidth: 2,
                        borderColor: '#e5e5e5',
                        fontSize: 16,
                        paddingVertical: 0,
                    },
                    inputAndroid: {
                        width: '100%',
                        height: 64,
                        paddingHorizontal: 16,
                        borderRadius: 16,
                        borderWidth: 2,
                        borderColor: '#e5e5e5',
                        fontSize: 16,
                        paddingVertical: 0,
                    },
                    placeholder: {
                        color: value ? 'black' : 'gray',
                    },
                }}
            />
        </View>
    )
}

export default ListPicker