import firebase from 'firebase';
import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();

var firebaseConfig = {
  apiKey: env.REACT_APP_API_KEY,
  authDomain: "react-dulcet-pro.firebaseapp.com",
  projectId: "react-dulcet-pro",
  storageBucket: "react-dulcet-pro.appspot.com",
  messagingSenderId: env.REACT_APP_MSI,
  appId: env.REACT_APP_ID,
  measurementId: env.REACT_APP_MI
};

const Fire = firebase.initializeApp(firebaseConfig);

export default Fire;