import axios from 'axios';
import React, {useState} from 'react';
import {signInData} from '../constant/interface';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);

  const handleSignIn = async () => {
    if (password.length <= 8) {
      return Alert.alert('password should have more than 8 corrector');
    } else if (password !== rePassword) {
      return Alert.alert('password not match');
    }

    let obj = {
      name,
      email,
      password,
      phoneNumber,
    };
    handleRegister(obj);
  };

  //handlePost Request for Signin;

  async function handleRegister(obj: signInData) {
    try {
      await axios.post(
        `https://real-pear-kangaroo-slip.cyclic.app/auth/sign`,
        obj,
        Alert.alert('Signin Sucessfull'),
        navigation.navigate('login'),
      );
    } catch (err) {
      console.log('err');
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleReEnterPasswprd = () => {
    setShowReEnterPassword(!showReEnterPassword);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={toggleShowPassword}
          style={styles.iconContainer}>
          <Entypo
            name={showPassword ? 'eye' : 'eye-with-line'}
            size={24}
            color="#000"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Re-Enter Password"
          value={rePassword}
          onChangeText={setRePassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={toggleReEnterPasswprd}
          style={styles.iconContainer}>
          <Entypo
            name={showReEnterPassword ? 'eye' : 'eye-with-line'}
            size={24}
            color="#000"
          />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    width: 300,
    height: 40,
    borderBottomWidth: 1,
    borderRadius: 4,
    padding: 10,
    margin: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    borderBottomWidth: 1,
    borderRadius: 4,

    margin: 10,
  },
  passwordInput: {
    flex: 1,
  },
  iconContainer: {
    padding: 5,
  },
  button: {
    width: 300,
    height: 40,
    backgroundColor: '#4FD3DA',
    borderRadius: 4,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Register;
