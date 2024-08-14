import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import moment from 'moment';

import DateTimePickerModal from "react-native-modal-datetime-picker";

const DatePicker = ({ title, value, onDateChange, otherStyles }) => {
    const [date, setDate] = useState()
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const dateFormat = (date) => {
        return moment(date).format('MMMM D, YYYY');
    }
    
    const handleConfirm = (selectedDate) => {
        setDate(selectedDate);
        setDatePickerVisibility(false);
        onDateChange(selectedDate);

        value = null
    };

    return (
        <View className={`my-2 ${otherStyles}`}>
            <Text className="text-base mb-2">{title}</Text>
            <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                <View className="w-full h-16 px-4 rounded-2xl border-2 border-gray-200 flex-row items-center">
                    <Text>{!value ? dateFormat(date) : dateFormat(value)}</Text>
                </View>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerVisibility(false)}
            />
        </View>
    )
}

export default DatePicker