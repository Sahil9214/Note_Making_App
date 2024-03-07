import React, {useState} from 'react';
import {
  Pressable,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {loginInData} from '../constant/interface';
import SInfo from 'react-native-sensitive-info';
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    let obj = {
      email,
      password,
    };
    await handleLoginRequest(obj);
  };

  const handleLoginRequest = async (obj: loginInData) => {
    try {
      let res = await axios.post(
        'https://real-pear-kangaroo-slip.cyclic.app/auth/login',
        obj,
      );

      Alert.alert('Successfully Login');
      const {data} = res;
      const {msg, token} = data;

      navigation.navigate('Home', {token: token});
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Create a new user </Text>
        <Pressable onPress={() => navigation.navigate('sign')}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    margin: 10,
  },
  button: {
    width: '80%',
    height: 40,
    borderRadius: 5,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  signupText: {
    fontSize: 16,
  },
  signupLink: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});
