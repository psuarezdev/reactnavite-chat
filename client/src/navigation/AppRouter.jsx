import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NotAuthScreens, AuthScreens } from './Navigators';
import { USER_STORAGE_KEY } from '../config/config';
import { SocketProvider } from '../context/SocketContext';

export default function AppRouter() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  const getUserData = async() => {
    try {
      if(user !== null) return;

      const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if(userData === null) return;

      setUser(JSON.parse(userData));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if(loading) {
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
    { 
      user 
        ? (
          <SocketProvider>
            <AuthScreens />
          </SocketProvider>
        ) 
        : <NotAuthScreens /> 
    }
    </NavigationContainer>
  );
}