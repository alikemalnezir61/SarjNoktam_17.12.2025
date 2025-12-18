import React, { useState, useEffect } from 'react';

// --- DÜZELTİLMİŞ IMPORT YOLLARI ---
import AppShell from '../screens/app/AppShell'; // <-- Doğru yol
import LoginScreen from '../screens/auth/LoginScreen'; // <-- Doğru yol
import { ModalProvider } from '../context/ModalContext'; // <-- Modal Merkezi
import { FavoritesProvider } from '../context/FavoritesContext';
import AdminRoute from './AdminRoute';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Uygulama açılışında token kontrolü
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  // Yükleniyor ekranı (Splash Screen)
  if (loading) {
    return (
      <div className="h-screen w-full bg-[#1a1a1a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#07B1FF] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // --- ROUTE KONTROLÜ ---
  if (window.location.pathname.startsWith('/admin')) {
    return <AdminRoute />;
  }
  // Tüm uygulamayı ModalProvider ile sarıyoruz ki her yerden pop-up açabilelim
  return (
    <FavoritesProvider>
      <ModalProvider>
        {!isAuthenticated ? <LoginScreen /> : <AppShell />}
      </ModalProvider>
    </FavoritesProvider>
  );
}