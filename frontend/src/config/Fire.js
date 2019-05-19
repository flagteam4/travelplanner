import firebase from 'firebase';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQ-jSCbsrYaTP5ig4swLYEbdxNnin35hQ",
    authDomain: "react-travel-project.firebaseapp.com",
    databaseURL: "https://react-travel-project.firebaseio.com",
    projectId: "react-travel-project",
    storageBucket: "react-travel-project.appspot.com",
    messagingSenderId: "908887896703",
    appId: "1:908887896703:web:a354fbcaf9649788"
};
// Initialize Firebase
export const fireApp = firebase.initializeApp(firebaseConfig);
