
import { initializeApp } from 'firebase/app';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAGm5AK8QXECeuPJ_tFlcdBSIA2Td2tVYw",
  authDomain: "cashcontrol-74570.firebaseapp.com",
  projectId: "cashcontrol-74570",
  storageBucket: "cashcontrol-74570.appspot.com",
  messagingSenderId: "142894653042",
  appId: "1:142894653042:web:54dfb30a5169c5af36aceb",
  measurementId: "G-EJJ8QPF4BX"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;