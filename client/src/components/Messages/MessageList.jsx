import { SafeAreaView, FlatList } from 'react-native';
import MessageItem from './MessageItem';

export default function MessageList({ messages }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <MessageItem message={item} />}
        keyExtractor={item => item.id}
        //! API MUST RETURN DESC ORDERED DATA
        inverted={true}
      />
    </SafeAreaView>
  );
}
