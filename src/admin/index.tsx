import React from 'react';
import { createRoot } from 'react-dom/client';
import AdminApp from './AdminApp';
import '../index.css';


const rootElement = document.getElementById('root');
if (rootElement) {
	createRoot(rootElement).render(<AdminApp />);
} else {
	document.body.innerHTML = '<div style="color:red;padding:40px">#root bulunamadı!</div>';
}
