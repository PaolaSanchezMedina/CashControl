import { initializeApp } from 'firebase/app';

// Configuración de Firebase con las credenciales del proyecto
const firebaseConfig = {
  apiKey: "AIzaSyAGm5AK8QXECeuPJ_tFlcdBSIA2Td2tVYw", // Clave de la API
  authDomain: "cashcontrol-74570.firebaseapp.com", // Dominio autorizado
  projectId: "cashcontrol-74570", // ID del proyecto
  storageBucket: "cashcontrol-74570.appspot.com", // Bucket de almacenamiento
  messagingSenderId: "142894653042", // ID del remitente de mensajes
  appId: "1:142894653042:web:54dfb30a5169c5af36aceb", // ID de la aplicación
  measurementId: "G-EJJ8QPF4BX" // ID de medición (opcional)
};

// Inicializa la aplicación Firebase con la configuración proporcionada
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp; // Exporta la instancia de la aplicación de Firebase