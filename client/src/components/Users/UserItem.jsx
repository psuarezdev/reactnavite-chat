import { View, Text, TouchableOpacity, Alert, Image, StyleSheet } from 'react-native';
import useAuth from '../../hooks/useAuth';
import useSocket from '../../hooks/useSocket';
import { useNavigation } from '@react-navigation/native';

import { API_URL } from '../../config/config';
import avatar from '../../assets/default.png'

export default function UserItem({ user }) {
  const { user: authUser } = useAuth();
  const socket = useSocket();

  const { navigate } = useNavigation();

  const createChat = async() => {
    try {
      const response = await fetch(`${API_URL}chat/create`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': authUser.token 
        },
        body: JSON.stringify({
          transmitter: authUser.data.id,
          receiver: user.id,
          transmitter_name: authUser.data.name,
          receiver_name: user.name
        })
      });

      const data = await response.json();

      if(data.status === 'error' && data.message !== 'Chat already exists') {
        throw new Error(data.message);
      }

      const { chat } = data;
      const chatName = authUser.data.id === chat.transmitter ? chat.receiver_name : chat.transmitter_name;

      if(data.status === 'error') {
        socket.emit('joinRoom', chat.id);
        navigate('Chat', { chatId: chat.id, title: chatName });
      }

      socket.emit('joinRoom', chat.id);
      navigate('Chat', { chatId: chat.id, title: chatName });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  if(user.id === authUser.data.id) return;

  return (
    <TouchableOpacity style={styles.container} onPress={createChat}>
      <View>
        <Image source={avatar} style={styles.avatar} />
      </View>
      <View>
        <Text style={styles.userName}>{user.name}</Text>
        {user.bio && <Text style={styles.userBio}>{user.bio}</Text>}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1, 
    borderBottomColor: 'gray',
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  avatar: {
    width: 40,
    height: 40,
  },
  userName: {
    fontSize: 16,
  },
  userBio: {
    color: 'gray',
    fontSize: 12,
    fontStyle: 'italic'
  }
});
