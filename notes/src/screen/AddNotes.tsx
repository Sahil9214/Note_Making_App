import React, {useState} from 'react';
import {Text, TextInput, View, StyleSheet, Pressable} from 'react-native';
import {globalColors} from '../constant/color';

import axios from 'axios';
import {addData} from '../constant/interface';
const AddNotes = ({route}) => {
  const {email, token} = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function addNotesHanler() {
    let obj = {
      email,
      title,
      description,
    };
    console.log('obj****', obj);
    postNotesData(obj);
    setTitle('');
    setDescription('');
  }

  async function postNotesData(obj: addData) {
    console.log('token****', token);
    if (token) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        console.log('confi', config);
        await axios.post(
          'https://real-pear-kangaroo-slip.cyclic.app/note/add',
          obj,
          config,
        );
      } catch (err) {
        console.error('Error fetching notes:', err);
      }
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Title here....."
        onChangeText={e => setTitle(e)}
        value={title}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter description here...."
        onChangeText={e => setDescription(e)}
        value={description}
      />
      <Pressable
        style={styles.pressable}
        android_ripple={{color: '#ccc'}}
        onPress={addNotesHanler}>
        <Text style={styles.btn}>Add</Text>
      </Pressable>
    </View>
  );
};

export default AddNotes;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginLeft: 30,
  },
  input: {
    borderBottomWidth: 2,
    padding: 15,
    marginTop: 20,
  },
  pressable: {
    marginTop: 20,
    padding: 15,
    backgroundColor: globalColors.accentColor,
    borderRadius: 20,
  },
  btn: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
