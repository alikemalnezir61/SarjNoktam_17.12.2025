import React, { useState } from 'react';
import { Icons } from '../../ui/Icons';
import { useModal } from '../../context/ModalContext';

export default function ProfileView() {
  const [balance, setBalance] = useState("450.00");
  const [activeSubScreen, setActiveSubScreen] = useState<'account' | 'payment' | 'notifications' | 'privacy' | 'gamification' | 'add-car' | 'support' | null>(null);
  
  const { showAlert, showConfirm, showPrompt } = useModal();

  // --- AKSİYONLAR ---
  const handleLogout = () => {
    showConfirm("Çıkış Yap", "Hesabınızdan çıkış yapmak istediğinize emin misiniz?", () => {
      localStorage.removeItem("userToken");
      window.location.reload();
    }, true);
  };

  const handleTopUp = () => {
    showPrompt("Bakiye Yükle", "Yüklemek istediğiniz tutarı giriniz (₺):", (val) => {
      if (val && !isNaN(Number(val))) {
        const newBalance = (parseFloat(balance) + parseFloat(val)).toFixed(2);
        setBalance(newBalance);
        showAlert("Başarılı", `${val} ₺ başarıyla cüzdanınıza yüklendi!`);
      } else {
        showAlert("Hata", "Lütfen geçerli bir tutar giriniz.");
      }
    });
  };

  // --- YÖNLENDİRME ---
  const commonProps = { onBack: () => setActiveSubScreen(null), showAlert, showConfirm, showPrompt };

  if (activeSubScreen === 'account') return <AccountSettingsScreen {...commonProps} />;
  if (activeSubScreen === 'payment') return <PaymentMethodsScreen {...commonProps} />;
  if (activeSubScreen === 'notifications') return <NotificationsScreen {...commonProps} />;
  if (activeSubScreen === 'privacy') return <PrivacySecurityScreen {...commonProps} />;
  if (activeSubScreen === 'gamification') return <GamificationScreen {...commonProps} />;
  if (activeSubScreen === 'add-car') return <AddCarScreen {...commonProps} />;
  if (activeSubScreen === 'support') return <SupportScreen {...commonProps} />;

  // --- ANA PROFİL EKRANI ---
  return (
    <div className="h-full bg-[#1a1a1a] pb-32 text-white overflow-y-auto animate-in slide-in-from-left duration-300 relative">
      
      {/* Header */}
      <div className="relative pt-8 pb-6 px-4 bg-gradient-to-b from-[#07B1FF]/20 to-[#1a1a1a] border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#07B1FF] to-purple-600 p-[2px]">
            <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center font-bold text-2xl">AN</div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Ali Kemal Nezir</h2>
            <p className="text-gray-400 text-sm">Seviye 12 • Efsane Pilot</p>
          </div>
        </div>
        <div className="mt-6 bg-[#1e293b]/60 border border-white/10 rounded-2xl p-4 flex justify-between items-center shadow-lg">
          <div><p className="text-gray-400 text-xs">Cüzdan Bakiyesi</p><h3 className="text-2xl font-bold">{balance} ₺</h3></div>
          <button onClick={handleTopUp} className="bg-[#07B1FF] text-black px-4 py-2 rounded-lg font-bold">Yükle</button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        
        {/* --- YENİ: DOĞA DOSTU İSTATİSTİKLER (Eco-Impact) --- */}
        <section className="relative overflow-hidden">
           <div className="bg-gradient-to-br from-[#064e3b] to-[#022c22] border border-green-500/20 rounded-2xl p-5 shadow-lg relative group cursor-pointer" onClick={() => showAlert("Harika!", "Dünya seninle nefes alıyor. Bu ay karbon ayak izinizi %40 azalttınız.")}>
               {/* Arka Plan Dekoru */}
               <div className="absolute -right-6 -top-6 text-green-500/10 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                   <Icons.Leaf className="w-32 h-32" />
               </div>
               
               <h3 className="text-green-400 font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10">
                   <Icons.Leaf className="w-4 h-4" /> Çevresel Etkim
               </h3>

               <div className="grid grid-cols-3 gap-3 relative z-10">
                   <div className="bg-black/30 backdrop-blur-sm rounded-xl p-2 text-center border border-white/5">
                       <div className="text-lg font-bold text-white">240<span className="text-[10px] font-normal text-gray-400 ml-0.5">kg</span></div>
                       <div className="text-[9px] text-green-300 uppercase mt-1">CO2 Tasarrufu</div>
                   </div>
                   <div className="bg-black/30 backdrop-blur-sm rounded-xl p-2 text-center border border-white/5">
                       <div className="text-lg font-bold text-white">12<span className="text-[10px] font-normal text-gray-400 ml-0.5">Adet</span></div>
                       <div className="text-[9px] text-green-300 uppercase mt-1">Ağaç Kurtarıldı</div>
                   </div>
                   <div className="bg-black/30 backdrop-blur-sm rounded-xl p-2 text-center border border-white/5">
                       <div className="text-lg font-bold text-white">180<span className="text-[10px] font-normal text-gray-400 ml-0.5">Lt</span></div>
                       <div className="text-[9px] text-green-300 uppercase mt-1">Benzin Tasarrufu</div>
                   </div>
               </div>
               
               <p className="text-center text-[10px] text-green-500/60 mt-3 italic font-medium">"Dünya seninle nefes alıyor 🌍"</p>
           </div>
        </section>

        {/* Sürücü Ligi */}
        <section onClick={() => setActiveSubScreen('gamification')} className="cursor-pointer">
           <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-2xl p-4 flex items-center justify-between border border-white/10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
               <div className="relative z-10">
                   <h4 className="font-bold flex items-center gap-2"><Icons.Shield className="w-4 h-4 text-yellow-400" /> ŞarjTR Ligi</h4>
                   <p className="text-xs text-purple-300 mt-1">Sıralama: <span className="text-white font-bold">#42</span> • İlk %5</p>
               </div>
               <Icons.ChevronRight className="w-5 h-5 relative z-10" />
           </div>
        </section>

        {/* Garaj */}
        <section>
          <div className="flex justify-between mb-2"><h3 className="text-sm font-bold text-gray-400">GARAJIM</h3><button onClick={() => setActiveSubScreen('add-car')} className="text-[#07B1FF] text-xs font-bold">Araç Ekle</button></div>
          <div className="bg-gray-800 border border-white/10 rounded-2xl p-4"><h4 className="font-bold">TOGG T10X</h4><p className="text-sm text-gray-500">34 AKN 61</p></div>
        </section>

        {/* Ayarlar */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold text-gray-400">AYARLAR</h3>
          <div className="bg-[#1e293b]/40 border border-white/5 rounded-2xl overflow-hidden">
            <MenuItem icon={<Icons.User className="w-5 h-5"/>} title="Hesap Bilgileri" onClick={() => setActiveSubScreen('account')} />
            <MenuItem icon={<Icons.CreditCard className="w-5 h-5"/>} title="Ödeme Yöntemleri" onClick={() => setActiveSubScreen('payment')} />
            <MenuItem icon={<Icons.Bell className="w-5 h-5"/>} title="Bildirimler" onClick={() => setActiveSubScreen('notifications')} />
            <MenuItem icon={<Icons.Shield className="w-5 h-5"/>} title="Gizlilik ve Güvenlik" onClick={() => setActiveSubScreen('privacy')} />
          </div>
        </section>

        {/* Destek */}
        <section>
           <h3 className="text-sm font-bold text-gray-400 mb-3">DESTEK</h3>
           <div className="bg-[#1e293b]/40 border border-white/5 rounded-2xl overflow-hidden">
               <MenuItem icon={<Icons.User className="w-5 h-5"/>} title="Destek ve İletişim" onClick={() => setActiveSubScreen('support')} />
           </div>
        </section>

        <button onClick={handleLogout} className="w-full p-4 text-red-500 font-bold bg-[#1e293b]/40 rounded-2xl border border-red-500/20 flex justify-center gap-2 mb-4">
          <Icons.LogOut className="w-5 h-5" /> Çıkış Yap
        </button>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------------
// 1. ARAÇ EKLEME EKRANI (FULL)
// --------------------------------------------------------------------------------
function AddCarScreen({ onBack, showAlert }: any) {
    const [carData, setCarData] = useState({ brand: 'TOGG', model: 'T10X', plate: '', nickname: '' });
    const handleSave = () => {
        if (!carData.plate) return showAlert("Eksik Bilgi", "Lütfen araç plakasını giriniz.");
        showAlert("Başarılı", `${carData.brand} ${carData.model} (${carData.plate}) garajınıza başarıyla park edildi! 🚘`);
        onBack();
    };
    return (
        <div className="h-full bg-[#1a1a1a] pb-32 text-white animate-in slide-in-from-bottom duration-300 overflow-y-auto">
            <div className="sticky top-0 z-10 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/5 p-4 flex items-center gap-4"><button onClick={onBack} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"><Icons.ChevronLeft className="w-5 h-5" /></button><h2 className="text-xl font-bold">Yeni Araç Ekle</h2></div>
            <div className="p-4 space-y-6">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl group border border-white/10"><div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black"></div><div className="absolute top-4 right-4 font-bold italic text-white/10 text-4xl">{carData.brand}</div><div className="relative z-10 p-6 h-full flex flex-col justify-between"><div><div className="bg-[#07B1FF]/20 text-[#07B1FF] text-xs font-bold px-2 py-1 rounded inline-block mb-2">ELEKTRİKLİ</div><h3 className="text-2xl font-bold text-white">{carData.brand} <span className="text-gray-400">{carData.model}</span></h3></div><div className="flex justify-between items-end"><div className="bg-white text-black px-1 py-1 rounded flex items-center gap-2 border-l-[6px] border-blue-600 w-32 shadow-lg"><div className="flex flex-col text-[6px] font-bold text-blue-600 leading-none"><span>TR</span></div><span className="font-bold font-mono text-lg tracking-wider uppercase">{carData.plate || "34 XX 00"}</span></div><Icons.Car className="w-12 h-12 text-gray-600" /></div></div></div>
                <div className="space-y-4">
                    <div className="space-y-1"><label className="text-xs text-gray-400 ml-1 font-bold">MARKA</label><select value={carData.brand} onChange={(e) => setCarData({...carData, brand: e.target.value})} className="w-full bg-[#1e293b]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#07B1FF]"><option value="TOGG">TOGG</option><option value="Tesla">Tesla</option><option value="Renault">Renault</option><option value="BMW">BMW</option><option value="Skywell">Skywell</option><option value="Volvo">Volvo</option></select></div>
                    <div className="space-y-1"><label className="text-xs text-gray-400 ml-1 font-bold">MODEL</label><select value={carData.model} onChange={(e) => setCarData({...carData, model: e.target.value})} className="w-full bg-[#1e293b]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#07B1FF]"><option value="T10X">T10X</option><option value="Model Y">Model Y</option><option value="Zoe">Zoe</option><option value="iX1">iX1</option><option value="ET5">ET5</option><option value="XC40">XC40</option></select></div>
                    <div className="space-y-1"><label className="text-xs text-gray-400 ml-1 font-bold">PLAKA</label><input value={carData.plate} onChange={(e) => setCarData({...carData, plate: e.target.value.toUpperCase()})} placeholder="34 ABC 123" maxLength={10} className="w-full bg-[#1e293b]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#07B1FF] transition-colors placeholder:text-gray-600"/></div>
                    <div className="space-y-1"><label className="text-xs text-gray-400 ml-1 font-bold">ARAÇ TAKMA ADI (Opsiyonel)</label><input value={carData.nickname} onChange={(e) => setCarData({...carData, nickname: e.target.value})} placeholder="Örn: Beyaz Şimşek" className="w-full bg-[#1e293b]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#07B1FF] transition-colors placeholder:text-gray-600"/></div>
                </div>
                <button onClick={handleSave} className="w-full py-4 bg-[#07B1FF] text-black font-bold rounded-xl mt-4 shadow-[0_0_15px_rgba(7,177,255,0.3)] hover:bg-[#0590d1] active:scale-95 transition-all">Aracı Garaja Ekle</button>
            </div>
        </div>
    );
}

// --------------------------------------------------------------------------------
// 2. GİZLİLİK VE GÜVENLİK (KVKK GÖRÜNTÜLEYİCİ İLE)
// --------------------------------------------------------------------------------
function PrivacySecurityScreen({ onBack, showPrompt, showConfirm, showAlert }: any) {
  const [activeDoc, setActiveDoc] = useState<'kvkk' | 'agreement' | null>(null);
  if (activeDoc) return <LegalDocScreen type={activeDoc} onBack={() => setActiveDoc(null)} />;
  return (
    <div className="h-full bg-[#1a1a1a] pb-32 text-white animate-in slide-in-from-right duration-300 overflow-y-auto"><div className="sticky top-0 z-10 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/5 p-4 flex items-center gap-4"><button onClick={onBack} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"><Icons.ChevronLeft className="w-5 h-5" /></button><h2 className="text-xl font-bold">Gizlilik ve Güvenlik</h2></div><div className="p-4 space-y-4"><div className="bg-[#1e293b]/40 rounded-xl overflow-hidden"><MenuItem icon={<Icons.Shield className="w-5 h-5" />} title="Şifre Değiştir" subtitle="Son değişiklik: 3 ay önce" onClick={() => showPrompt("Şifre Değiştir", "Yeni şifrenizi giriniz:", (val: string) => showAlert("Başarılı", "Şifreniz güncellendi."))} /><div className="h-[1px] bg-white/5 mx-4" /><MenuItem icon={<Icons.User className="w-5 h-5" />} title="2FA" subtitle="Devre Dışı" badge="Önerilen" onClick={() => showConfirm("2FA", "Google Authenticator kullanılsın mı?", () => showAlert("Bilgi", "Kurulum maili gönderildi."))} /></div><div className="mt-6"><h4 className="text-sm font-bold text-gray-500 uppercase mb-2">Yasal Metinler</h4><div className="bg-[#1e293b]/40 rounded-xl overflow-hidden"><MenuItem title="Kullanıcı Sözleşmesi" onClick={() => setActiveDoc('agreement')} /><div className="h-[1px] bg-white/5 mx-4" /><MenuItem title="KVKK Aydınlatma Metni" onClick={() => setActiveDoc('kvkk')} /></div></div><div className="mt-8 border border-red-500/30 rounded-xl p-4 bg-red-500/5"><h4 className="text-red-500 font-bold mb-2">Tehlikeli Bölge</h4><button onClick={() => showPrompt("Hesabı Sil", "Silmek için 'SIL' yazınız:", (val: string) => { if(val === 'SIL') window.location.reload(); else showAlert("Hata", "Yanlış giriş yapıldı."); })} className="w-full py-3 text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white transition-colors rounded-xl font-bold text-sm">Hesabı Sil</button></div></div></div>
  );
}

function LegalDocScreen({ type, onBack }: { type: 'kvkk' | 'agreement', onBack: () => void }) {
    const title = type === 'kvkk' ? "KVKK Aydınlatma Metni" : "Kullanıcı Sözleşmesi";
    const content = type === 'kvkk' ? (<><h3 className="text-[#07B1FF] font-bold mb-2">1. Veri Sorumlusu</h3><p className="mb-4 text-gray-300">Bu metin, ŞarjTR Teknoloji A.Ş. tarafından hazırlanmıştır.</p><h3 className="text-[#07B1FF] font-bold mb-2">2. İşlenen Veriler</h3><p className="mb-4 text-gray-300">Kimlik, İletişim ve Araç bilgileriniz işlenmektedir.</p><h3 className="text-[#07B1FF] font-bold mb-2">3. Amaçlar</h3><p className="mb-4 text-gray-300">Hizmet sunumu ve yasal yükümlülükler.</p></>) : (<><h3 className="text-[#07B1FF] font-bold mb-2">1. Taraflar</h3><p className="mb-4 text-gray-300">Kullanıcı ve ŞarjTR arasındadır.</p><h3 className="text-[#07B1FF] font-bold mb-2">2. Hizmet</h3><p className="mb-4 text-gray-300">Şarj istasyonu bulma ve ödeme hizmetleri.</p></>);
    return (<div className="h-full bg-[#1a1a1a] pb-32 text-white animate-in slide-in-from-right duration-300 overflow-y-auto"><div className="sticky top-0 z-10 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/5 p-4 flex items-center gap-4"><button onClick={onBack} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"><Icons.ChevronLeft className="w-5 h-5" /></button><h2 className="text-xl font-bold truncate">{title}</h2></div><div className="p-6 text-sm leading-relaxed">{content}<div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-500 text-xs">Son Güncelleme: 15 Aralık 2025</div></div></div>);
}

// --------------------------------------------------------------------------------
// DİĞER ALT EKRANLAR (Aynı)
// --------------------------------------------------------------------------------
function SupportScreen({ onBack, showAlert }: any) { const [type, setType] = useState<'suggestion' | 'satisfaction' | 'complaint'>('suggestion'); const [message, setMessage] = useState(''); const handleSubmit = () => { if(!message.trim()) return showAlert("Eksik Bilgi", "Lütfen bir mesaj yazınız."); setTimeout(() => { showAlert("Teşekkürler", "Mesajınız iletildi."); onBack(); }, 800); }; const getTypeColor = () => { if (type === 'suggestion') return 'bg-[#07B1FF] text-black shadow-[0_0_15px_rgba(7,177,255,0.4)]'; if (type === 'satisfaction') return 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]'; return 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]'; }; return (<div className="h-full bg-[#1a1a1a] pb-32 text-white animate-in slide-in-from-right duration-300 overflow-y-auto"><div className="sticky top-0 z-10 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/5 p-4 flex items-center gap-4"><button onClick={onBack} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"><Icons.ChevronLeft className="w-5 h-5" /></button><h2 className="text-xl font-bold">Destek Merkezi</h2></div><div className="p-4 space-y-6"><div className="bg-[#1e293b]/50 p-1 rounded-xl flex"><button onClick={() => setType('suggestion')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${type === 'suggestion' ? 'bg-[#07B1FF] text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}>💡 Öneri</button><button onClick={() => setType('satisfaction')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${type === 'satisfaction' ? 'bg-green-500 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}>😍 Memnuniyet</button><button onClick={() => setType('complaint')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${type === 'complaint' ? 'bg-red-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>😡 Şikayet</button></div><div className="space-y-2"><label className="text-sm font-bold ml-1 text-gray-300">Mesajınız</label><textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Mesajınızı buraya yazın..." className="w-full h-40 bg-[#1e293b]/50 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-white/30 resize-none transition-colors" /></div><button onClick={handleSubmit} className={`w-full py-4 rounded-xl font-bold text-sm transition-all active:scale-95 ${getTypeColor()}`}>Gönder</button><div className="mt-8 pt-8 border-t border-white/5 space-y-4"><h3 className="text-center text-gray-400 text-xs font-bold uppercase tracking-widest">Diğer İletişim Kanalları</h3><a href="tel:+908501234567" className="flex items-center justify-between bg-[#1e293b]/40 p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors group"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div><div><p className="text-xs text-gray-500">Müşteri Hizmetleri</p><p className="font-bold font-mono group-hover:text-[#07B1FF] transition-colors">+90 850 123 45 67</p></div></div><Icons.ChevronRight className="w-5 h-5 text-gray-600" /></a><a href="https://sarjnoktam.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-[#1e293b]/40 p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors group"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></div><div><p className="text-xs text-gray-500">Web Sitemiz</p><p className="font-bold group-hover:text-[#07B1FF] transition-colors">sarjnoktam.com</p></div></div><Icons.ChevronRight className="w-5 h-5 text-gray-600" /></a></div></div></div>); }
function AccountSettingsScreen({ onBack, showAlert }: any) { return <div className="h-full bg-[#1a1a1a] pb-32 text-white animate-in slide-in-from-right duration-300 overflow-y-auto"><div className="sticky top-0 z-10 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/5 p-4 flex items-center gap-4"><button onClick={onBack} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"><Icons.ChevronLeft className="w-5 h-5" /></button><h2 className="text-xl font-bold">Hesap Bilgileri</h2></div><div className="p-4 space-y-6"><div className="flex flex-col items-center"><div className="w-24 h-24 rounded-full bg-gray-800 border-2 border-[#07B1FF] flex items-center justify-center text-3xl font-bold overflow-hidden relative group"><span>AN</span><div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center cursor-pointer" onClick={() => showAlert("Bilgi", "Kamera yakında!")}><Icons.Edit className="w-6 h-6" /></div></div><button className="text-[#07B1FF] text-xs font-bold mt-2 hover:underline">Fotoğrafı Değiştir</button></div><div className="space-y-4"><InputGroup label="Ad Soyad" value="Ali Kemal Nezir" onChange={()=>{}} /><InputGroup label="E-posta" value="ali@example.com" onChange={()=>{}} /><InputGroup label="Telefon" value="0555 123 45 67" onChange={()=>{}} /></div><button onClick={() => {showAlert("Başarılı", "Güncellendi."); onBack();}} className="w-full py-4 bg-[#07B1FF] text-black font-bold rounded-xl mt-4">Değişiklikleri Kaydet</button></div></div>; }
function NotificationsScreen({ onBack }: any) { return <div className="h-full bg-[#1a1a1a] pb-32 text-white animate-in slide-in-from-right duration-300 overflow-y-auto"><div className="p-4"><button onClick={onBack} className="mb-4 text-[#07B1FF]">← Geri</button><h2 className="text-2xl font-bold">Bildirimler</h2></div></div>; }
function GamificationScreen({ onBack }: any) { return <div className="h-full bg-[#0B0F17] pb-32 text-white animate-in slide-in-from-right duration-300 overflow-y-auto"><div className="p-4"><button onClick={onBack} className="mb-4 text-[#07B1FF]">← Geri</button><h2 className="text-2xl font-bold">Lig</h2></div></div>; }
// --------------------------------------------------------------------------------
// 3. ÖDEME YÖNTEMLERİ (YENİ - KART EKLEME ÖZELLİKLİ)
// --------------------------------------------------------------------------------
function PaymentMethodsScreen({ onBack, showConfirm, showAlert }: any) {
  const [isAdding, setIsAdding] = useState(false);
  const [cards, setCards] = useState([
    { id: 1, holder: 'ALİ KEMAL NEZİR', number: '**** **** **** 4582', expiry: '12/28', type: 'mastercard' }
  ]);
  
  // Form State
  const [formData, setFormData] = useState({ holder: '', number: '', expiry: '', cvv: '' });

  // Kart Numarası Formatlama (0000 0000 0000 0000)
  const handleNumChange = (e: any) => {
    let val = e.target.value.replace(/\D/g, '');
    val = val.substring(0, 16);
    val = val.replace(/(\d{4})/g, '$1 ').trim();
    setFormData({ ...formData, number: val });
  };

  // Tarih Formatlama (AA/YY)
  const handleDateChange = (e: any) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length >= 3) val = val.substring(0, 2) + '/' + val.substring(2, 4);
    setFormData({ ...formData, expiry: val });
  };

  const handleSave = () => {
    if (formData.number.length < 19 || !formData.holder || !formData.expiry || !formData.cvv) {
      return showAlert("Eksik Bilgi", "Lütfen tüm kart bilgilerini doğru giriniz.");
    }
    
    // Yeni kartı listeye ekle (Mock)
    const newCard = {
      id: Date.now(),
      holder: formData.holder.toUpperCase(),
      number: `**** **** **** ${formData.number.slice(-4)}`,
      expiry: formData.expiry,
      type: 'visa'
    };

    setCards([...cards, newCard]);
    setIsAdding(false);
    setFormData({ holder: '', number: '', expiry: '', cvv: '' });
    showAlert("Başarılı", "Yeni ödeme yönteminiz eklendi! 🎉");
  };

  // --- KART EKLEME MODU ---
  if (isAdding) {
    return (
      <div className="h-full bg-[#1a1a1a] pb-32 text-white animate-in slide-in-from-right duration-300 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/5 p-4 flex items-center gap-4">
          <button onClick={() => setIsAdding(false)} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
            <Icons.ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold">Kart Ekle</h2>
        </div>

        <div className="p-4 space-y-6">
          {/* Kart Önizleme */}
          <div className="w-full aspect-[1.586] rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-white/10 p-6 relative overflow-hidden shadow-2xl transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#07B1FF]/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                 <Icons.CreditCard className="w-8 h-8 text-white/50" />
                 <span className="font-bold italic text-white/30 text-lg">BANK</span>
              </div>
              <div className="space-y-4">
                <div className="font-mono text-xl tracking-widest text-white drop-shadow-md">
                    {formData.number || '0000 0000 0000 0000'}
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">Kart Sahibi</div>
                    <div className="font-medium text-sm tracking-wide uppercase">{formData.holder || 'AD SOYAD'}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">SKT</div>
                    <div className="font-medium text-sm tracking-wide">{formData.expiry || 'AA/YY'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Alanları */}
          <div className="space-y-4">
            <InputGroup 
                label="Kart Üzerindeki İsim" 
                value={formData.holder} 
                onChange={(val: string) => setFormData({...formData, holder: val})} 
                placeholder="AD SOYAD" 
            />
            <InputGroup 
                label="Kart Numarası" 
                value={formData.number} 
                onChange={(val: string) => handleNumChange({target: {value: val}})} 
                placeholder="0000 0000 0000 0000" 
                maxLength={19}
            />
            <div className="flex gap-4">
                <div className="flex-1">
                    <InputGroup 
                        label="Son Kullanma (AA/YY)" 
                        value={formData.expiry} 
                        onChange={(val: string) => handleDateChange({target: {value: val}})} 
                        placeholder="MM/YY" 
                        maxLength={5}
                    />
                </div>
                <div className="flex-1">
                    <InputGroup 
                        label="CVV / CVC" 
                        value={formData.cvv} 
                        onChange={(val: string) => setFormData({...formData, cvv: val.replace(/\D/g, '').substring(0,3)})} 
                        placeholder="***" 
                        maxLength={3}
                    />
                </div>
            </div>
          </div>

          <button onClick={handleSave} className="w-full py-4 bg-[#07B1FF] text-black font-bold rounded-xl shadow-[0_0_15px_rgba(7,177,255,0.3)] hover:bg-[#0590d1] active:scale-95 transition-all">
            Kartı Kaydet
          </button>
        </div>
      </div>
    );
  }

  // --- LİSTELEME MODU ---
  return (
    <div className="h-full bg-[#1a1a1a] pb-32 text-white animate-in slide-in-from-right duration-300 overflow-y-auto">
      <div className="sticky top-0 z-10 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/5 p-4 flex items-center gap-4">
        <button onClick={onBack} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
          <Icons.ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold">Ödeme Yöntemleri</h2>
      </div>

      <div className="p-4 space-y-4">
        {cards.map((card) => (
            <div key={card.id} className="relative w-full aspect-[1.586] rounded-2xl bg-gradient-to-r from-[#1e293b] to-[#0f172a] border border-white/10 p-6 flex flex-col justify-between overflow-hidden group hover:border-[#07B1FF]/50 transition-colors cursor-pointer" onClick={() => showConfirm("Kart Sil", "Bu kartı silmek istiyor musunuz?", () => setCards(cards.filter(c => c.id !== card.id)))}>
                <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="relative z-10 flex justify-between items-start">
                    <Icons.CreditCard className="w-8 h-8 text-[#07B1FF]" />
                    {card.type === 'mastercard' && <div className="flex -space-x-2"><div className="w-6 h-6 rounded-full bg-red-500/80"></div><div className="w-6 h-6 rounded-full bg-yellow-500/80"></div></div>}
                    {card.type === 'visa' && <div className="font-bold italic text-xl tracking-tighter text-white">VISA</div>}
                </div>
                <div className="relative z-10 space-y-2">
                    <div className="text-lg tracking-widest font-mono text-gray-300">{card.number}</div>
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>{card.holder}</span>
                        <span>{card.expiry}</span>
                    </div>
                </div>
            </div>
        ))}

        <button 
            onClick={() => setIsAdding(true)} 
            className="w-full py-4 border border-dashed border-gray-600 rounded-xl text-gray-400 mt-4 flex items-center justify-center gap-2 hover:bg-white/5 hover:text-white hover:border-white transition-all active:scale-95"
        >
            <Icons.Plus className="w-5 h-5" /> Yeni Kart Ekle
        </button>
      </div>
    </div>
  );
}

function MenuItem({ icon, title, subtitle, badge, onClick }: any) { return <button onClick={onClick} className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors text-left active:bg-white/10"><div className="flex items-center gap-3"><div className="text-gray-400">{icon}</div><div><h5 className="text-white font-medium text-sm">{title}</h5>{subtitle && <p className="text-gray-500 text-xs">{subtitle}</p>}</div></div><div className="flex items-center gap-2">{badge && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">{badge}</span>}<div className="text-gray-600"><Icons.ChevronRight className="w-5 h-5" /></div></div></button>; }
function InputGroup({ label, value, onChange, placeholder, maxLength }: any) { return <div className="space-y-1"><label className="text-xs text-gray-400 ml-1">{label}</label><input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} maxLength={maxLength} className="w-full bg-[#1e293b]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#07B1FF] transition-colors placeholder:text-gray-600"/></div>; }