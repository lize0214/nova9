import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { initI18n } from './i18n/index.js';
import '../css/reset.css';
import '../css/variables.css';
import '../css/layout.css';
import '../css/components.css';
import '../css/responsive.css';

initI18n().then(() => {
    ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
});
