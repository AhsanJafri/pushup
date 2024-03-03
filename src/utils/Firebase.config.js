import {Platform} from 'react-native';
import firebase from '@react-native-firebase/app';

// pluck values from your `GoogleService-Info.plist` you created on the firebase console
const iosConfig = {
  clientId:
    '494755426897-2h5s86uh0qkhlhkk7j8neuduqd7u15r1.apps.googleusercontent.com',
  apiKey: 'AIzaSyB9YhVajxVgODWQ_b967Gl6PiszOPVXq0E',
  projectId: 'pushups-241bb',
  storageBucket: 'pushups-241bb.appspot.com',
  messagingSenderId: '494755426897',
  appId: '1:494755426897:web:d9d77a964fb908830cfe70',
  databaseURL: 'https://pushups-241bb-default-rtdb.firebaseio.com/',
  persistence: true,
};

const androidConfig = {
  clientId:
    '494755426897-v6krp4hfcgr5tlsk1fmteeu8t3jjten0.apps.googleusercontent.com',
  apiKey: 'AIzaSyB9YhVajxVgODWQ_b967Gl6PiszOPVXq0E',
  projectId: 'pushups-241bb',
  storageBucket: 'pushups-241bb.appspot.com',
  messagingSenderId: '494755426897',
  appId: '1:494755426897:android:fd78503a2ec2a6c50cfe70',
  databaseURL: 'https://pushups-241bb-default-rtdb.firebaseio.com/',
  // Add the following line for the certificate hash
  certificateHash: '5e8f16062ea3cd2c4a0d547876baa6f38cabf625',
};

const firebaseConfig = {
  apiKey: 'AIzaSyB9YhVajxVgODWQ_b967Gl6PiszOPVXq0E',
  authDomain: 'pushups-241bb.firebaseapp.com',
  projectId: 'pushups-241bb',
  storageBucket: 'pushups-241bb.appspot.com',
  messagingSenderId: '494755426897',
  appId: '1:494755426897:ios:4629a8edbaeed1070cfe70',
  measurementId: 'G-FJWZ5M9W2W',
  databaseURL: 'https://pushups-241bb-default-rtdb.firebaseio.com/',
  persistence: true,
};

export const firebaseAuth = () => {
  !firebase.apps.length
    ? firebase.initializeApp({
        apiKey: 'AIzaSyB9YhVajxVgODWQ_b967Gl6PiszOPVXq0E',
        appId: '1:494755426897:ios:4629a8edbaeed1070cfe70',
        databaseURL: 'https://pushups-241bb-default-rtdb.firebaseio.com/',
        messagingSenderId: '494755426897',
        projectId: 'pushups-241bb',
        storageBucket: 'pushups-241bb.appspot.com',
      })
    : firebase.app();
};
