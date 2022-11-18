import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './reset.css';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
