import { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Alert } from 'react-native';
import useAuth from '../../hooks/useAuth';

import { API_URL } from '../../config/config';
import ChatItem from './ChatItem';


export default function UsersList({ search }) {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);

  const getChats = async() => {
    try {
      const response = await fetch(`${API_URL}chat/all`, {
        method: 'GET',
        headers: { 'Authorization': user.token }
      });
  
      const data = await response.json();
  
      if(data.status === 'error') throw new Error(data.message);

      setChats(data.chats);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const deleteChat = async(chatId) => {
    try {
      const response = await fetch(`${API_URL}chat/delete`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': user.token 
        },
        body: JSON.stringify({ 
          id: chatId, 
          transmitter: user.data.id 
        })
      });

      const data = await response.json();

      if(data.status === 'error') throw new Error(data.message);

      const chatsFiltered = chats.filter(chat => chat.id !== chatId);
      setChats(chatsFiltered);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const chatsFiltered = search.length > 0 
    ? [...chats].filter(chat => {
      const chatName = user.data.id === chat.transmitter ? chat.receiver_name : chat.transmitter_name;
      return chatName.toLowerCase().includes(search.toLowerCase());
    })
    : chats;

  useEffect(() => {
    getChats();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={chatsFiltered}
        renderItem={({ item }) => <ChatItem chat={item} deleteChat={deleteChat} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}
