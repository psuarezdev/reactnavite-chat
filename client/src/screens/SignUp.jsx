import { useState } from 'react';
import { View, Text, TextInput, Image, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from '../hooks/useAuth';
import { API_URL, USER_STORAGE_KEY } from '../config/config';

import { styles } from './Login';
import backImage from '../assets/backImage.png';

export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [surnames, setSurnames] = useState('');
  const [nick, setNick] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUser } = useAuth();

  const handleSignUp = async() => {
    try {
      if(name.length === 0) throw new Error('The name can\'t be empty');
      if(surnames.length === 0) throw new Error('The surnames can\'t be empty');
      if(nick.length === 0) throw new Error('The nickname can\'t be empty');
      if(email.length === 0) throw new Error('The email can\'t be empty');
      if(password.length === 0) throw new Error('The password can\'t be empty');

      const response = await fetch(`${API_URL}user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, surnames, nick, email, password })
      });

      const data = await response.json();

      if(data.status === 'error') throw new Error(data.message);

      setUser({ data: data.user, token: data.token });
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify({ data: data.user, token: data.token }));
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={{ fontSize: 36, fontWeight: 'bold', color: 'orange', alignSelf: 'center', paddingBottom: 24, marginTop: 80 }}>
          Sign Up
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name..."
          autoCapitalize="none"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter surnames..."
          autoCapitalize="none"
          value={surnames}
          onChangeText={text => setSurnames(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter nickname..."
          autoCapitalize="none"
          value={nick}
          onChangeText={text => setNick(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter email..."
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password..."
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}> 
            Sign Up
          </Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: 5 }}>
          <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>
            Have already an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: '#f57c00', fontWeight: '600', fontSize: 14 }}> 
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
