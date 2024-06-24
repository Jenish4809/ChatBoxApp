import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './src/auth/Splash';
import SignUpScreen from './src/auth/SignUpScreen';
import Login from './src/auth/Login';
import Home from './src/Screens/Home';
import Users from './src/tabs/Users';
import Settings from './src/tabs/Settings';
import Chat from './src/Screens/Chat';
import ApiUserData from './src/tabs/ApiUserData';
import {useEffect} from 'react';
import {
  notificationListner,
  requestUserPermission,
} from './src/utils/notificationService';
import Screen1 from './src/asyncStorageLearn.js/Screen1';
import Screen2 from './src/asyncStorageLearn.js/Screen2';

export default function App() {
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    // requestUserPermission();
    // notificationListner();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="ApiUserData" component={ApiUserData} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
