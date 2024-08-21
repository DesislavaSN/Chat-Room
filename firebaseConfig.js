// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore, collection} from 'firebase/firestore';
import {getReactNativePersistence, initializeAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0CLGXOAsJ-n1fC5osmVqcKFKvEgMahTk",
  authDomain: "fir-chat-21875.firebaseapp.com",
  projectId: "fir-chat-21875",
  storageBucket: "fir-chat-21875.appspot.com",
  messagingSenderId: "1078339894328",
  appId: "1:1078339894328:web:8b3be9040f2dbffc167acd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ref for the collections in our db:  
const usersRef = collection(db, 'users');
const roomsRef = collection(db, 'rooms');

// persisting the user into a local storage - Firebase collection: after refreshing the app do not loose the user data!
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export {
  db,
  usersRef,
  roomsRef,
  auth,
}