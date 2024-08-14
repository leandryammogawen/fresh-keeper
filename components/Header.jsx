import { View, TouchableOpacity } from 'react-native'
import React from 'react'

import AntDesign from '@expo/vector-icons/AntDesign';

const Header = ({ onOpen }) => {
    return (
        <View className="flex-row bg-white justify-between items-center h-14 px-5">
            <TouchableOpacity onPress={onOpen}>
                <AntDesign name="menuunfold" color="black" size={25} />
            </TouchableOpacity>
            {/* <AntDesign name="search1" color="black" size={25} /> */}
        </View>
    )
}

export default Header