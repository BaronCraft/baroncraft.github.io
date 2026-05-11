import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import Feed from './pages/Feed';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import './styles/main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Feed />} />
            <Route path="messages" element={<Messages />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
