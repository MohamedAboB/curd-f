import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCvzI3EWOAMfpytMOvNHvj0ulMGX2h_rCo",
  authDomain: "fir-auth-fbcd6.firebaseapp.com",
  projectId: "fir-auth-fbcd6",
  storageBucket: "fir-auth-fbcd6.appspot.com",
  messagingSenderId: "56389601286",
  appId: "1:56389601286:web:b297de32937c84323f1b87",
  measurementId: "G-71DB6JGT40"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const database = getFirestore(app)