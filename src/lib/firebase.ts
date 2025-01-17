// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChNonsZBfWb4B_7v-7_3-TdAfkcX8Ovxc",
  authDomain: "reis-imovel.firebaseapp.com",
  projectId: "reis-imovel",
  storageBucket: "reis-imovel.appspot.com",
  messagingSenderId: "760311148250",
  appId: "1:760311148250:web:c3d3af30f76c5d9e583fe3",
  measurementId: "G-T076PP00X8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };