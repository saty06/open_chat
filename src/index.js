import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './assets/css/App.css';
import { GoogleOAuthProvider } from "@react-oauth/google"

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
 
   <GoogleOAuthProvider clientId='374953879618-qm2fuvgtiask393c6jear6duo30n02j6.apps.googleusercontent.com'>
    <BrowserRouter>
    <App />
  </BrowserRouter>,
  
 </GoogleOAuthProvider>
);
