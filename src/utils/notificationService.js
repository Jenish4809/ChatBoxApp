import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
import notifee from '@notifee/react-native';

// Request User Permission
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  ).then(granted => {
    if (granted === PermissionsAndroid.RESULTS.GRANTED || enabled) {
      console.log('You can use the notifications');
      getFcmToken();
    } else {
      console.log('Notification permission denied');
    }
  });
}

// Get FCM Token
const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('fcmToken: old', fcmToken);
  try {
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('fcmToken: new', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  } catch (error) {
    console.log('getFcmToken error:', error);
  }
};

// Notification Listner
export const notificationListner = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'onNotificationOpenedApp',
      JSON.stringify(remoteMessage.notification),
    );
    notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId: 'default',
      },
    });
  });

  messaging().onMessage(async remoteMessage => {
    console.log(
      'A new FCM message arrived!',
      JSON.stringify(remoteMessage.notification),
    );
    notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId: 'default',
      },
    });
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log(
      'Message handled in the background!',
      JSON.stringify(remoteMessage.notification),
    );
    messaging().displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
    });
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'getInitialNotification',
          JSON.stringify(remoteMessage.notification),
        );
        notifee.displayNotification({
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
          android: {
            channelId: 'default',
          },
        });
      }
    });
};
