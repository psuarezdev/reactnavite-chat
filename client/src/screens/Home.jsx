import { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import ChatList from '../components/Chats/ChatList';
import Search from '../components/Search';
import Settings from '../components/Settings';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Home({ navigation }) {

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    navigation.setOptions({ 
      headerRight: () => ( 
        <View style={styles.headerRightStyle}>
          <Search onPress={() => setShowSearch(showSearch => !showSearch)} /> 
          <Settings />
        </View>
      )
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.chatsContainer}>
        <ChatList search={search} />
      </View>
      <View style={styles.addChatsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Users')}
          style={styles.chatButton}
        >
          <Ionicons name="add-outline" size={30} color="#FAFAFA" />
        </TouchableOpacity>
      </View> 
      {
        showSearch && 
          <TextInput
            style={styles.input}
            placeholder="Search nickname..."
            autoCapitalize="none"
            value={search}
            onChangeText={text => setSearch(text)}
            autoFocus={true}
            onBlur={() => setShowSearch(false)}
          />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headerRightStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  chatsContainer: {
    flex: 1
  },
  addChatsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingEnd: 12,
    paddingBottom: 12
  },
  chatButton: {
    backgroundColor: '#f57c00',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#f57c00',
    shadowOffset: {
      width: 0,
      height: 2,
    }, 
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 62,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    fontSize: 16,
    borderRadius: 10,
    padding: 12
  }
});
