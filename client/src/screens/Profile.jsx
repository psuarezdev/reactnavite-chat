import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from '../hooks/useAuth';

import { styles as loginStyles } from './Login';
import { API_URL, USER_STORAGE_KEY } from '../config/config';

export default function Profile() {
  const [name, setName] = useState('');
  const [surnames, setSurnames] = useState('');
  const [nick, setNick] = useState(null);
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');

  const { user: authUser, setUser: setAuthUser } = useAuth();

  const getUserData = () => {
    setName(authUser.data.name);
    setSurnames(authUser.data.surnames);
    setNick(authUser.data.nick);
    setBio(authUser.data.bio);
    setEmail(authUser.data.email);
  };

  const handleUpdate = async() => {
    try {
      if(name.length === 0) throw new Error('The name can\'t be empty');
      if(surnames.length === 0) throw new Error('The surnames can\'t be empty');
      if(nick.length === 0) throw new Error('The nickname can\'t be empty');
      if(email.length === 0) throw new Error('The email can\'t be empty');

      const updateResponse = await fetch(`${API_URL}user/update/${authUser.data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authUser.token
        },
        body: JSON.stringify({ name, surnames, nick, bio, email })
      });

      const updateData = await updateResponse.json();

      if(updateData.status === 'error') throw new Error(updateData.message);

      const { token, user } = updateData;

      setAuthUser({ token, data: user });
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify({ token, data: user }));
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={loginStyles.container}>
      <SafeAreaView style={loginStyles.form}>
        <Text style={styles.title}>
          Update Profile
        </Text>
        <TextInput
          style={loginStyles.input}
          placeholder="Enter name..."
          autoCapitalize="none"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={loginStyles.input}
          placeholder="Enter surnames..."
          autoCapitalize="none"
          value={surnames}
          onChangeText={text => setSurnames(text)}
        />
        <TextInput
          style={loginStyles.input}
          placeholder="Enter nickname..."
          autoCapitalize="none"
          value={nick}
          onChangeText={text => setNick(text)}
        />
        <TextInput
          style={loginStyles.input}
          placeholder="Enter Biography..."
          autoCapitalize="none"
          value={bio}
          onChangeText={text => setBio(text)}
        />
        <TextInput
          style={loginStyles.input}
          placeholder="Enter email..."
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <View style={styles.buttons}>
          <TouchableOpacity style={loginStyles.button} onPress={handleUpdate}>
            <Text style={styles.button}> 
              &nbsp; Save &nbsp;
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={getUserData} style={{ backgroundColor: 'red', height: 58, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
            <Text style={styles.button}> 
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "orange",
    alignSelf: "center",
    paddingBottom: 24
  },
  button: {
    fontWeight: 'bold', 
    color: '#fff', 
    fontSize: 16,
    paddingHorizontal: 12
  },
  buttons: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    gap: 15
  }
});
