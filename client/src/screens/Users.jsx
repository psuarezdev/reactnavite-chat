import { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import UsersList from '../components/Users/UsersList'; 
import Search from '../components/Search';


export default function Users({ navigation }) {
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  
  useEffect(() => {
    navigation.setOptions({ 
      headerRight: () => <Search onPress={() => setShowSearch(showSearch => !showSearch)} />
    });
  }, []);

  return (
    <View style={styles.container}>
      <UsersList search={search} />
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
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
