import React, { Component } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Text } from 'react-native-elements';

// It is for cloud logging
// import * as Sentry from "@sentry/react-native";
// Sentry.init({ dsn: "__DSN__" });

// Error boundary handler for components 
export default class ErrorBoundary extends Component {

    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error: error, errorInfo: errorInfo });
        console.log(errorInfo);
        // Sentry.captureMessage(errorMessage); // Cloud logging
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <SafeAreaView style={styles.container}>
                    <Text style={styles.text} h4>Something went wrong</Text>
                </SafeAreaView>
            );
        }
        return this.props.children;
    }
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