import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from "react-native";
import { Text } from 'react-native-elements';

// It is for cloud logging
// import * as Sentry from "@sentry/react-native";
// Sentry.init({ dsn: "__DSN__" });

// Fatal error component
export default function Error({ error }) {
    
    useEffect(() => {
        console.log(error.stack);
        // Sentry.captureMessage((error.stack); // Cloud logging
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text} h4>Something went wrong</Text>
            <Text style={styles.text}>Start Over</Text>            
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
    text: {
        color: '#FFB02E',
        alignSelf: 'center'
    },    
});
