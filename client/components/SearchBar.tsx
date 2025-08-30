import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type SearchBarProps = {
    onChangeText: (text: string) => void;
    value: string;
};

export default function SearchBar({ onChangeText, value }: SearchBarProps) {
    return (
        <View style={styles.container}>
            <Ionicons name="search" size={20} color="#999" style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholder="Search..."
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="#999"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eee',
        paddingHorizontal: 10,
        color: "#000",
        borderRadius: 40,
        paddingVertical: 5,
        marginLeft: 20,
        marginRight: 20,
        position: 'absolute',
        zIndex: 1,
        top: 15,
        borderWidth: 1,
        borderColor: '#aaa',
        boxShadow: '0px 0px 6px 1px #aaa',
    },
    icon: {
        marginRight: 5,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
});
