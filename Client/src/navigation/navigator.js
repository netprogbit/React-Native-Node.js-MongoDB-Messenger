import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Register from '../components/Register';
import Login from '../components/Login';
import Home from '../components/Home';
import Messenger from '../components/Messenger';
import Logout from '../components/Logout';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen name="Login" component={Login} options={{ title: "Login" }} />
        <AuthStack.Screen name="Register" component={Register} options={{ title: "Registration" }} />
    </AuthStack.Navigator>
);

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
    <Drawer.Navigator>
        <Drawer.Screen name="Home" component={TabScreen} />
        <Drawer.Screen name="Sign Out" component={Logout} />
    </Drawer.Navigator>
);

const Tab = createBottomTabNavigator();
const TabScreen = () => (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Sign Out" component={Logout} />
    </Tab.Navigator>
);

const RootStack = createStackNavigator();
export const RootStackScreen = ({ userToken, selectedUser }) => (
    <RootStack.Navigator headerMode="none">
        {
            userToken ? (
                selectedUser ? (
                    <RootStack.Screen name='Messenger' component={Messenger} />
                ) : (
                        <RootStack.Screen name='Application' component={DrawerScreen} />
                    )
            ) : (
                    <RootStack.Screen name='Authenticate' component={AuthStackScreen} />
                )
        }
    </RootStack.Navigator>
);