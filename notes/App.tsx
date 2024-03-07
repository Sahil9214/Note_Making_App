import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Entypo from 'react-native-vector-icons/Entypo';

import Home from './src/screen/Home';
import AddNotes from './src/screen/AddNotes';
import Register from './src/screen/Register';
import Login from './src/screen/Login';
import {globalColors} from './src/constant/color';
import SetReminderScreen from './src/screen/SetReminder';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            height: 100,
            backgroundColor: globalColors.headerColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: globalColors.backgroundColor,
          },
          tabBarStyle: {
            backgroundColor: 'blue',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={({navigation}) => ({
            headerTitle: 'Home',
            headerTintColor: '#FFFFFF', // Text color of header
            headerStyle: {backgroundColor: '#007AFF'}, // Background color of header
            headerRight: () => (
              <Entypo
                name="login"
                size={30}
                color={'#fff'}
                onPress={() => navigation.navigate('login')}
              />
            ),
          })}
        />
        <Stack.Screen name="addNotes" component={AddNotes} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="sign" component={Register} />
        <Stack.Screen name="setReminder" component={SetReminderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
