import { useEffect, useState } from 'react';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';
import useAuth from '../hooks/useAuth';
import useSocket from '../hooks/useSocket';

import { API_URL } from '../config/config';
import MessageList from '../components/Messages/MessageList';

export default function Chat() {
  const route = useRoute();
  const { setOptions } = useNavigation();
  const { chatId, title } = route.params;
  
  const { user } = useAuth();
  const socket = useSocket();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const getMessages = async() => {
    try {
      const response = await fetch(`${API_URL}chat/${chatId}/messages`, {
        method: 'GET',
        headers: { 'Authorization': user.token }
      });

      const data = await response.json();

      if(data.status === 'error') throw new Error(data.message);

      if(data.messages && data.messages.length > 0) setMessages(data.messages);
    } catch (error) {
      Alert.alert(error.message);
    }
  }; 

  const sendMessage = async() => {
    try {
      if(message.length === 0) return;

      const response = await fetch(`${API_URL}message/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user.token
        },
        body: JSON.stringify({
          chat_id: chatId,
          transmitter: user.data.id,
          content: message
        })
      });

      const data = await response.json();

      if(data.status === 'error') throw new Error(data.message);

      socket.emit('message', { 
        roomId: chatId,
        message: data.message_created 
      });

      setMessage('');
      setMessages(prevMessages => [data.message_created, ...prevMessages]);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    setOptions({ title });

    if(messages.length === 0) getMessages();

    const recieveMessage = (newMessage) => setMessages(prevMessages => [newMessage, ...prevMessages]);

    socket.on('message', recieveMessage);

    return () => socket.off('message', recieveMessage);
  }, [messages]);

  return (
    <View style={styles.container}>
      <View style={styles.messagesContainer}>
        <MessageList messages={messages} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Message..."
          autoCapitalize="none"
          value={message}
          onChangeText={text => setMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  messagesContainer: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 12
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#f2f2f2',
    paddingBottom: 12,
    paddingHorizontal: 12
  },
  input: {
    flex: 1,
    backgroundColor: "#F6F7FB",
    height: 58,
    fontSize: 16,
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    padding: 12
  },
  sendButton: {
    height: 58,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#f57c00',
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});