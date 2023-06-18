import { TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from '../hooks/useAuth';
import useSocket from '../hooks/useSocket';

import { USER_STORAGE_KEY } from '../config/config';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Logout() {
  const { setUser } = useAuth();
  const socket = useSocket();

  const logout = async() => {
    try {
      socket.disconnect();
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      setUser(null);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <TouchableOpacity style={{ paddingStart: 5 }} onPress={logout}>
      <Ionicons name="log-out-outline" size={30} />
    </TouchableOpacity>
  );
}