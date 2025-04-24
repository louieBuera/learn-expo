import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {useLocalSearchParams} from "expo-router";

const MoviewDetails = () => {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>Movie Details: { id }</Text>
        </View>
    )
}

export default MoviewDetails;
const styles = StyleSheet.create({})