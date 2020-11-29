import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBytCvRyZOMFo5NzDap0uuuasUm5OIBs9M",
  authDomain: "e-commerce-ea75f.firebaseapp.com",
  databaseURL: "https://e-commerce-ea75f.firebaseio.com",
  projectId: "e-commerce-ea75f",
  storageBucket: "e-commerce-ea75f.appspot.com",
  messagingSenderId: "339065692368",
  appId: "1:339065692368:web:3abb71089a7b035093bed5",
  measurementId: "G-0JSNV94D30",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
