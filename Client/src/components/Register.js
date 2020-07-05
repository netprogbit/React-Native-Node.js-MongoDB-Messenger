import React, { Fragment } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchRegister } from '../store/actions/auth.actions';
import Icon from 'react-native-vector-icons/dist/Entypo';
import { Input, Text, ThemeProvider } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';

// User registration
export default function Register() {

    const dispatch = useDispatch();
    
    const onRegister = (name, email, password) => {
        dispatch(fetchRegister({ name: name, email: email, password: password }));
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text} h4>Registration</Text>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps='handled'>
                <Formik
                    initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
                    onSubmit={values => onRegister(values.name, values.email, values.password)}
                    validationSchema={yup.object().shape({
                        name: yup
                            .string()
                            .min(3)
                            .required('Name is required'),
                        email: yup
                            .string()
                            .email()
                            .required('Email is required'),
                        password: yup
                            .string()
                            .min(6)
                            .required('Password is required'),
                        confirmPassword: yup
                            .string()
                            .oneOf([yup.ref("password"), null], "Passwords must match")
                            .required('Confirm Password is required'),
                    })}
                >
                    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                        <Fragment>
                            <ThemeProvider theme={theme}>
                                <Input
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    placeholder="Name"
                                    onBlur={() => setFieldTouched('name')}
                                    leftIcon={<Icon name='user' size={24} style={styles.icon} />}
                                    errorStyle={styles.validationError}
                                    errorMessage={(touched.name && errors.name) ? errors.name : ''}
                                />
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
                                <Input
                                    value={values.confirmPassword}
                                    onChangeText={handleChange('confirmPassword')}
                                    placeholder="Confirm password"
                                    onBlur={() => setFieldTouched('confirmPassword')}
                                    secureTextEntry={true}
                                    leftIcon={<Icon name='lock' size={24} style={styles.icon} />}
                                    errorStyle={styles.validationError}
                                    errorMessage={(touched.confirmPassword && errors.confirmPassword) ? errors.confirmPassword : ''}
                                />                                
                                <TouchableOpacity disabled={!isValid} onPress={handleSubmit} style={styles.sendButton}>
                                    <Text style={styles.sendButtonText} >Register</Text>
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