import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';
import useSocket from '../../hooks/useSocket';

import Ionicons from '@expo/vector-icons/Ionicons';
import avatar from '../../assets/default.png';

export default function UserItem({ chat, deleteChat }) {
  const { user } = useAuth();
  const socket = useSocket();

  const { navigate } = useNavigation();
  const chatName = user.data.id === chat.transmitter ? chat.receiver_name : chat.transmitter_name;

  const joinRoom = (chatId, chatName) => {
    socket.emit('joinRoom', chatId);
    navigate('Chat', { chatId, title: chatName });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => joinRoom(chat.id, chatName)}>
      <View>
        <Image source={avatar} style={styles.avatar} />
      </View>
      <View style={styles.rightSide}>
        <Text>{chatName}</Text>
        <Ionicons name="trash-outline" size={30} onPress={() => deleteChat(chat.id)} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1, 
    borderBottomColor: 'gray',
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  avatar: {
    width: 35,
    height: 35,
  },
  rightSide: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
