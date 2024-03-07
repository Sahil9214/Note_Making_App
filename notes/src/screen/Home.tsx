import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  Text,
  Pressable,
} from 'react-native';
import axios from 'axios';
import {globalColors} from '../constant/color';

const Home = ({navigation, route}) => {
  const [data, setData] = useState([]);

  const token = route?.params?.token;

  //*search functionality
  const handleSearch = async userQuery => {
    if (token) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          'https://real-pear-kangaroo-slip.cyclic.app/note/search',
          {
            params: {userQuery}, // Pass userQuery as a query parameter
            ...config, // Include headers in the request
          },
        );
        console.log('responseData', response?.data?.data);
        setData(response?.data?.data);
      } catch (err) {
        console.error('Error searching notes:', err);
      }
    }
  };
  function moveToAddNotes() {
    navigation.navigate('addNotes', {token: token, email: data[0]?.email});
  }

  useEffect(() => {
    fetchNotes();
  }, [token]);

  async function fetchNotes() {
    if (token) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          'https://real-pear-kangaroo-slip.cyclic.app/note/get',
          config,
        );
        console.log('responseData*****', response.data);
        setData(response.data?.msg);
      } catch (err) {
        console.error('Error fetching notes:', err);
      }
    }
  }
  //handlPressav

  async function handlePressable(id) {
    console.log('id', id);
    navigation.navigate('setReminder', {noteId: id});
  }

  function renderData({item}) {
    const {time} = item;

    return (
      <Pressable
        style={styles.itemContainer}
        android_ripple={{color: '#ccc'}}
        onPress={() => handlePressable(item._id)}>
        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.description}>{item.description}</Text>
        {time === undefined ? (
          ''
        ) : (
          <Text style={styles.time}>Notification - {time}</Text>
        )}
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TextInput
          onChangeText={handleSearch}
          style={styles.input}
          placeholder="Enter Title/Description here for search"
        />
      </View>

      {data.length !== 0 ? (
        <View>
          <Pressable
            style={styles.pressable}
            android_ripple={{color: '#ccc'}}
            onPress={moveToAddNotes}>
            <Text style={styles.pressableText}>Add Notes</Text>
          </Pressable>
          <FlatList
            data={data}
            renderItem={renderData}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      ) : (
        <View style={styles.error}>
          <Text style={styles.errorText}>Login First....</Text>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  textContainer: {
    width: '80%',
    marginLeft: 35,
    marginRight: 20,
  },
  input: {
    height: 40,
    marginVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    backgroundColor: globalColors.inputBackgroundColor,
    borderRadius: 7,
  },
  itemContainer: {
    width: '80%',
    padding: 10,

    borderWidth: 2,
    borderBottomColor: '#ccc',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 35,
    marginRight: 20,
    marginTop: 30,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 32,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'red',
  },
  pressable: {
    marginRight: 30,
    marginLeft: 35,
    padding: 15,
    backgroundColor: globalColors.accentColor,
    borderRadius: 20,
    marginTop: 20,
  },
  pressableText: {
    textAlign: 'center',
    color: '#ccc',
    fontWeight: 'bold',
    fontSize: 18,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginTop: 10,
  },
});
