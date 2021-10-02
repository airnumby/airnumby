import config from './config';


const firebaseDevConfig = {
    apiKey: "AIzaSyDWBolSbGC2KZoKm9S7Zt65AfAp3Iaa9bI",
    authDomain: "airnumby.firebaseapp.com",
    projectId: "airnumby",
    storageBucket: "airnumby.appspot.com",
    messagingSenderId: "482712424964",
    appId: "1:482712424964:web:2ec2d6ba5d8c63fdb2db51"
};

const firebaseProdConfig = firebaseDevConfig;

export const firebaseConfig = config.isProduction ? firebaseProdConfig : firebaseDevConfig;