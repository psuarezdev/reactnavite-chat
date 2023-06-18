import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

import Home from '../screens/Home';
import Users from '../screens/Users';
import Chat from '../screens/Chat';
import Profile from '../screens/Profile';

import Logout from '../components/Logout';

const Stack = createStackNavigator();

export function NotAuthScreens() {
  return(
    <Stack.Navigator screenOptions={style.notAuthScreenOptions}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

export function AuthScreens() {
  return(
    <Stack.Navigator screenOptions={style.authScreenOptions}>
      <Stack.Screen name="Home" component={Home} options={{ title: 'Chats', headerLeft: () => <Logout /> }} />
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

const style = StyleSheet.create({
  notAuthScreenOptions: {
    headerShown: false
  },
  authScreenOptions: {
    headerTitleAlign: 'center'
  }
});
