import React, { Fragment } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/Entypo';
import { Input, Text, ThemeProvider } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import { fetchLogin } from '../store/actions/auth.actions';

// Signing in
export default function Login(props) {

    const dispatch = useDispatch();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text} h4>Sign In</Text>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps='handled'>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={values => dispatch(fetchLogin({ email: values.email, password: values.password }))}
                    validationSchema={yup.object().shape({
                        email: yup
                            .string()
                            .email()
                            .required('Email is required'),
                        password: yup
                            .string()
                            .min(6)
                            .required('Password is required')
                    })}
                >
                    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                        <Fragment>
                            <ThemeProvider theme={theme}>
                                <Input
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={() => setFieldTouched('email')}
                                    placeholder="E-mail"
                                    leftIcon={<Icon name='mail' size={24} style={styles.icon} />}
                                    errorStyle={styles.validationError}
                                    errorMessage={(touched.email && errors.email) ? errors.email : ''}
                                />
                                <Input
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    placeholder="Password"
                                    onBlur={() => setFieldTouched('password')}
                                    secureTextEntry={true}
                                    leftIcon={<Icon name='lock' size={24} style={styles.icon} />}
                                    errorStyle={styles.validationError}
                                    errorMessage={(touched.password && errors.password) ? errors.password : ''}
                                />                                
                                <TouchableOpacity disabled={!isValid} onPress={handleSubmit} style={styles.sendButton}>
                                    <Text style={styles.sendButtonText} >Sign In</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.touchable} onPress={() => props.navigation.navigate('Register')} >
                                    <Text style={styles.text}>Registration</Text>
                                </TouchableOpacity>
                            </ThemeProvider>
                        </Fragment>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaView>
    );
}

const theme = {
    colors: {
        primary: '#FFB02E',
    },
    Input: {
        inputStyle: {
            color: '#D7D7D7'
        }
    },    
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scroll: {
        flex: 1,
        paddingHorizontal: 60
    },
    scrollContainer: {
        flexGrow: 1,
    },
    icon: {
        color: '#FFB02E'
    },
    touchable: {
        width: '50%',
        alignSelf: 'center',
        backgroundColor: "#2A211C",
        padding: 10
    },
    text: {
        color: '#FFB02E',
        alignSelf: 'center'
    },
    validationError: {
        color: 'red'
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