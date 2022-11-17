import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import './reset.css';
import './styles.css';

const firebaseConfig = {
  databaseURL: 'https://todo-list-6d707-default-rtdb.firebaseio.com',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
getDatabase(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
