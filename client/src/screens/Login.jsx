import { useState } from 'react';
import { View, Text, TextInput, Image, SafeAreaView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from '../hooks/useAuth';
import backImage from '../assets/backImage.png';
import { API_URL, USER_STORAGE_KEY } from '../config/config';


export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUser } = useAuth();

  const handleLogin = async() => {
    try {
      if(email.length === 0) throw new Error('The email can\'t be empty');
      if(password.length === 0) throw new Error('The password can\'t be empty');

      const response = await fetch(`${API_URL}user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
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
        <Text style={styles.title}>Log In</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}> 
            Log In
          </Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: 5 }}>
          <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{ color: '#f57c00', fontWeight: '600', fontSize: 14 }}> 
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "orange",
    alignSelf: "center",
    paddingBottom: 24,
    marginTop: 24
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: 'cover'
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30
  },
  button: {
    backgroundColor: '#f57c00',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  }
});