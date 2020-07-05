import React from 'react';
import { SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { signOut } from '../store/actions/auth.actions';

// Signing out
export default function Logout() {

    const dispatch = useDispatch();

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => dispatch(signOut())} style={styles.sendButton}>
                <Text style={styles.sendButtonText}>Sign Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#2A211C"
    },
    sendButton: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#79553D',
        backgroundColor: '#FFB02E',
        alignSelf: 'center',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sendButtonText: {
        color: '#2A211C',
        fontWeight: 'bold',
    },
});
