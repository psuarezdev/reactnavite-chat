import { View, Text, StyleSheet } from 'react-native';
import useAuth from '../../hooks/useAuth';

import moment from 'moment';

export default function MessageItem({ message }) {

  const { user } = useAuth();

  const isMine = user.data.id === message.transmitter;

  return (
    <View style={isMine ? styles.transmitter : styles.receiver}>
      <Text style={styles.text}>{message.content}</Text>
      <Text style={styles.date}>{moment(message.createdAt).fromNow()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  transmitter: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: 'orange',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  receiver: {
    flex: 1,
    alignSelf: 'flex-start',
    backgroundColor: 'blueviolet',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  },
  date: {
    fontSize: 12,
    color: 'white'
  }
});
