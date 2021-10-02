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

const firebaseProdConfig = {
    apiKey: "AIzaSyBlQZVXg4JOca7_KjxzBtxnENalEB5XiFw",
    authDomain: "johan-friends.firebaseapp.com",
    projectId: "johan-friends",
    storageBucket: "johan-friends.appspot.com",
    messagingSenderId: "363179700047",
    appId: "1:363179700047:web:7577d81e7441404af59f3a",
    measurementId: "G-DPKEJL4KWF"
};

export const firebaseConfig = config.isProduction ? firebaseProdConfig : firebaseDevConfig;