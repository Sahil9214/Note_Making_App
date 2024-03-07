import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  Pressable,
} from 'react-native';
import {globalColors} from '../constant/color';
import axios from 'axios';


const SetReminderScreen = ({route}) => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [second, setSecond] = useState('');
  const [amPm, setAmPm] = useState('AM'); // State to hold AM/PM selection
  const noteId = route?.params?.noteId;

  const handleSetReminder = () => {
    const reminderTime = new Date();
    const hour24 = amPm === 'AM' ? Number(hours) : Number(hours) + 12; // Convert to 24-hour format if PM selected
    reminderTime.setHours(hour24);
    reminderTime.setMinutes(Number(minutes));

  

    Alert.alert(
      'Reminder Set',
      `Notification set for ${hours}:${minutes}:${second} ${amPm}`,
    );
    fetchTimeData(`${hours}:${minutes}:${second} ${amPm}`);
  };

  function fetchTimeData(time) {
    try {
      axios.patch(`https://real-pear-kangaroo-slip.cyclic.app/note/time`, {
        noteId,
        time,
      });
    } catch (err) {
      console.log('err', err);
    }
  }

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.timeInput}>
          <TextInput
            style={styles.textInput}
            placeholder="Hours"
            value={hours}
            onChangeText={text => setHours(text)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Minutes"
            value={minutes}
            onChangeText={text => setMinutes(text)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Second"
            value={second}
            onChangeText={text => setSecond(text)}
          />
        </View>
        <View style={styles.amPmInput}>
          <Pressable
            onPress={() => setAmPm('AM')}
            style={[styles.amPmButton, amPm === 'AM' && styles.selected]}>
            <Text style={styles.amPmButtonText}>AM</Text>
          </Pressable>
          <Pressable
            onPress={() => setAmPm('PM')}
            style={[styles.amPmButton, amPm === 'PM' && styles.selected]}>
            <Text style={styles.amPmButtonText}>PM</Text>
          </Pressable>
        </View>
      </View>
      <Pressable
        android_ripple={{color: '#ccc'}}
        style={styles.pressable}
        onPress={handleSetReminder}>
        <Text style={styles.pressableText}>Set Reminder</Text>
      </Pressable>
    </View>
  );
};

export default SetReminderScreen;

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 2,
    marginTop: 20,
    flex: 1,
  },
  container: {
    width: '80%',
    marginLeft: 30,
  },
  timeInput: {
    flexDirection: 'row',
  },
  amPmInput: {
    flexDirection: 'row',
    marginTop: 20,
  },
  amPmButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#eee',
    marginRight: 10,
    borderRadius: 5,
  },
  selected: {
    backgroundColor: globalColors.accentColor,
  },
  amPmButtonText: {
    fontWeight: 'bold',
  },
  pressable: {
    marginTop: 20,
    padding: 20,
    backgroundColor: globalColors.accentColor,
    width: '80%',
    marginLeft: 30,
    borderRadius: 20,
  },
  pressableText: {
    textAlign: 'center',
  },
});
