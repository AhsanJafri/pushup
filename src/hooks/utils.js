import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  try {
    // Initialize Firebase Cloud Messaging
    await messaging().registerDeviceForRemoteMessages();

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  } catch (error) {
    console.error('Error initializing FCM:', error);
  }
}

export const getToken = async () => {
  try {
    // Initialize Firebase Cloud Messaging
    await messaging().registerDeviceForRemoteMessages();

    const token = await messaging().getToken();
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
  }
};
