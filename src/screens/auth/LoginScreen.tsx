import React, { useState } from 'react';
import { Icons } from '../../ui/Icons';
import { useModal } from '../../context/ModalContext'; // <--- ARTIK BURADA DA VAR

// Basit Formatlama Fonksiyonları
const isTRPhone = (val: string) => /^(05|5)\d{9}$/.test(val.replace(/\s/g, ''));
const formatTRPhone = (val: string) => {
  const cleaned = ('' + val).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1,4})(\d{0,3})(\d{0,2})(\d{0,2})$/);
  if (match) return [match[1], match[2], match[3], match[4]].filter(Boolean).join(' ');
  return val;
};

export default function LoginScreen() {
  // EKRAN DURUMU: 'login' mi 'register' mı?
  const [view, setView] = useState<'login' | 'register'>('login');
  
  // Form Verileri
  const [formData, setFormData] = useState({
    name: '',
    login: '', // email veya telefon
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Havalı Modal Hook'u
  const { showAlert } = useModal();

  // Input Değişiklik Yönetimi
  const handleChange = (field: string, value: string) => {
    let finalValue = value;
    // Telefon formatlama
    if (field === 'login' && /^\d/.test(value.trim())) {
        finalValue = formatTRPhone(value);
    }
    setFormData(prev => ({ ...prev, [field]: finalValue }));
  };

  // GİRİŞ YAPMA İŞLEMİ
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.login || !formData.password) {
      showAlert("Eksik Bilgi", "Lütfen e-posta/telefon ve şifrenizi giriniz.");
      return;
    }

    setLoading(true);
    // Simülasyon
    setTimeout(() => {
      setLoading(false);
      // Başarılı giriş
      localStorage.setItem('userToken', 'demo_token_123');
      window.location.reload(); // App.tsx yakalasın diye
    }, 1500);
  };

  // KAYIT OLMA İŞLEMİ
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.login || !formData.password) {
      showAlert("Eksik Bilgi", "Lütfen tüm alanları doldurunuz.");
      return;
    }

    setLoading(true);
    // Simülasyon
    setTimeout(() => {
      setLoading(false);
      showAlert("Kayıt Başarılı", "Hesabınız oluşturuldu! Şimdi giriş yapabilirsiniz.", () => {
          setView('login'); // Giriş ekranına at
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Arka Plan Efektleri */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[#07B1FF]/20 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-purple-600/20 rounded-full blur-[80px]"></div>

      {/* Logo Alanı */}
      <div className="mb-8 text-center z-10 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="w-20 h-20 bg-gradient-to-tr from-[#07B1FF] to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(7,177,255,0.4)]">
          <Icons.Zap className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">ŞarjTR</h1>
        <p className="text-gray-400 text-sm mt-2">Geleceğin Enerjisi</p>
      </div>

      {/* Form Kartı */}
      <div className="w-full max-w-sm bg-[#1e293b]/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl z-10 animate-in zoom-in-95 duration-300">
        
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {view === 'login' ? 'Giriş Yap' : 'Hesap Oluştur'}
        </h2>
        
        <form onSubmit={view === 'login' ? handleLogin : handleRegister} className="space-y-4">
          
          {/* Sadece Kayıt Ekranında Görünen İsim Alanı */}
          {view === 'register' && (
            <div className="space-y-1 animate-in slide-in-from-left duration-300">
                <label className="text-xs text-gray-400 ml-1 uppercase font-bold">Ad Soyad</label>
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Ali Kemal Nezir"
                        className="w-full bg-[#0B0F17] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#07B1FF] transition-colors"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                    />
                    <div className="absolute left-4 top-3.5 text-gray-500"><Icons.User className="w-5 h-5" /></div>
                </div>
            </div>
          )}

          {/* E-posta / Telefon */}
          <div className="space-y-1">
            <label className="text-xs text-gray-400 ml-1 uppercase font-bold">E-posta veya Telefon</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="mail@ornek.com veya 05..."
                className="w-full bg-[#0B0F17] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#07B1FF] transition-colors"
                value={formData.login}
                onChange={(e) => handleChange('login', e.target.value)}
              />
              <div className="absolute left-4 top-3.5 text-gray-500">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
            </div>
          </div>

          {/* Şifre */}
          <div className="space-y-1">
            <label className="text-xs text-gray-400 ml-1 uppercase font-bold">Şifre</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                className="w-full bg-[#0B0F17] border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white focus:outline-none focus:border-[#07B1FF] transition-colors"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
              />
              <div className="absolute left-4 top-3.5 text-gray-500">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-500 hover:text-white"
              >
                {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
          </div>

          {view === 'login' && (
            <div className="flex justify-end">
                <button type="button" onClick={() => showAlert("Şifre Sıfırla", "Şifre sıfırlama bağlantısı e-postanıza gönderildi.")} className="text-xs text-[#07B1FF] hover:underline">Şifremi Unuttum</button>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-[#07B1FF] hover:bg-[#0590d1] text-black font-bold rounded-xl shadow-[0_0_20px_rgba(7,177,255,0.3)] transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mt-4"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : (
              view === 'login' ? "Giriş Yap" : "Kayıt Ol"
            )}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-white/10">
          <p className="text-gray-400 text-xs">
            {view === 'login' ? "Hesabın yok mu?" : "Zaten hesabın var mı?"}
            <button 
                onClick={() => {
                    setView(view === 'login' ? 'register' : 'login');
                    setFormData({ name: '', login: '', password: '' }); // Formu temizle
                }} 
                className="text-[#07B1FF] font-bold hover:underline ml-1"
            >
                {view === 'login' ? "Kayıt Ol" : "Giriş Yap"}
            </button>
          </p>
        </div>
      </div>
      
      <p className="absolute bottom-6 text-gray-600 text-[10px]">v1.0.4 • 2025 ŞarjTR Teknoloji A.Ş.</p>
    </div>
  );
}