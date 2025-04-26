import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons } from '@/constants/icons'

interface Props {
  placeholder: string,
  onPress?: () => void,
  value?: string,
  onChangeText?: (text: string) => void 
  refetch?: () => void
}

const SearchBar = ({
  placeholder,
  onPress,
  value = '',
  onChangeText,
  refetch
}: Props) => {
  const [val, setVal] = useState(value);

  // useEffect(() => {
  //   const timeoutId = setTimeout(async () => {
  //     if(onChangeText) onChangeText(val);
  //   }, 500)
  //   return () => clearTimeout(timeoutId);
  // }, [val])

  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <TouchableOpacity
        onPress={() => {
          if(onChangeText) onChangeText(val);
          if(refetch) refetch();
        }}
      >
        <Image source={icons.search}
          className="size-5"
          resizeMode="contain"
          tintColor="#ab8bff"
        />
      </TouchableOpacity>
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={val}
        onEndEditing={() => onChangeText ? onChangeText(val) : null }
        onChangeText={text => setVal(text)}
        placeholderTextColor='#a8b5db'
        className='flex-1 ml-2 text-white'
      />
    </View>
  )
}

export default SearchBar