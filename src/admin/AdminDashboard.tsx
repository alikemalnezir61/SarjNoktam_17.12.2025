import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminMain from './AdminMain';
import AdminStations from './AdminStations';
import AdminUsers from './AdminUsers';
import AdminFavorites from './AdminFavorites';
import AdminNotifications from './AdminNotifications';
import AdminSettings from './AdminSettings';

const PAGES = {
  Dashboard: AdminMain,
  'Firmalar': AdminStations,
  'Kullanıcılar': AdminUsers,
  'Favoriler': AdminFavorites,
  'Bildirimler': AdminNotifications,
  'Ayarlar': AdminSettings,
};

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState('Dashboard');
  const PageComponent = PAGES[activePage] || AdminMain;
  return (
    <div className="flex min-h-screen bg-gray-900">
      <AdminSidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 p-8 overflow-y-auto h-screen max-h-screen">
        <div className="min-h-[600px]">{/* Alt sayfa containerı, overflow ile kaydırılabilir */}
          {activePage === 'Dashboard' ? (
            <AdminMain setActivePage={setActivePage} />
          ) : (
            <PageComponent />
          )}
        </div>
      </div>
    </div>
  );
}
