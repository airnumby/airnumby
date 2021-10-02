import config from './config';


const firebaseDevConfig = {
    apiKey: "AIzaSyAvuPU4hUaNKTlEeb98dzp8_NmVBVmu2UE",
    authDomain: "johan-friends-dev.firebaseapp.com",
    projectId: "johan-friends-dev",
    storageBucket: "johan-friends-dev.appspot.com",
    messagingSenderId: "784244381293",
    appId: "1:784244381293:web:2aa8612295595f91d95164",
    measurementId: "G-SM1LN62RM3"
};

const firebaseProdConfig = firebaseDevConfig;

export const firebaseConfig = config.isProduction ? firebaseProdConfig : firebaseDevConfig;