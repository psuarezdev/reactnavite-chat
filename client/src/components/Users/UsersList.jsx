import { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Alert } from 'react-native';
import useAuth from '../../hooks/useAuth';

import { API_URL } from '../../config/config';
import UserItem from './UserItem';

export default function UsersList({ search }) {

  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  const getUsers = async() => {
    try {
      const response = await fetch(`${API_URL}user/all`, {
        method: 'GET',
        headers: { 'Authorization': user.token }
      });
  
      const data = await response.json();
  
      if(data.status === 'error') throw new Error(data.message);

      setUsers(data.users);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const usersFiltered = search.length > 0 
    ? [...users].filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
    : users;

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={usersFiltered}
        renderItem={({ item }) => <UserItem user={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}
