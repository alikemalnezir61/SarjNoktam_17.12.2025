import React, { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  try {
    if (!isAuthenticated) {
      return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
    }
    return <AdminDashboard />;
  } catch (e) {
    return <div style={{color:'red',padding:40}}>Bir hata oluştu: {String(e)}</div>;
  }
}
