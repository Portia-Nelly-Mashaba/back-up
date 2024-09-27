import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import HotelProvider from './context/HotelContext';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

<HotelProvider>
    <Provider store={store}>
      
        <App />
      
    </Provider>
</HotelProvider>
);
