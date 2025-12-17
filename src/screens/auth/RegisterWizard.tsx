// Backend NOT Bölümü

// Telefon backend’e her zaman boşluksuz gider: 05551234567
// Email backend’e aynen gider
//Backend şu iki olasılığı beklemeli:

//{ name, email, password }

//{ name, phone, password }

//------------------------------------------

import { useMemo, useState } from 'react';
import { Icons } from '../../ui/Icons';
import NeonInput from '../../ui/NeonInput';
import AuthBackground from '../../ui/AuthBackground';
import { authApi } from '../../api/auth';

import {
  formatTRPhone,
  isEmail,
  isTRPhone,
  normalizeTRPhone,
} from '../../utils/format';
import { validatePassword } from '../../utils/password';

type RegisterWizardProps = {
  onComplete: () => void;
  onLoginClick: () => void;
};

export default function RegisterWizard({
  onComplete,
  onLoginClick,
}: RegisterWizardProps) {
  const [step, setStep] = useState(1);

  // Step 1 fields
  const [name, setName] = useState('');
  const [contact, setContact] = useState(''); // email veya telefon
  const [password, setPassword] = useState('');

  // Step 2 (OTP demo)
  const [otp, setOtp] = useState('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const contactType = useMemo(() => {
    const c = contact.trim();
    if (!c) return 'none';
    if (isEmail(c)) return 'email';
    if (isTRPhone(c)) return 'phone';
    return 'invalid';
  }, [contact]);

  const pwState = useMemo(() => validatePassword(password), [password]);

  const ProgressBar = () => (
    <div className="flex gap-2 mb-8">
      {[1, 2, 3].map((s) => (
        <div
          key={s}
          className={`h-1 flex-1 rounded-full transition-all duration-500 ${
            step >= s ? 'bg-[#07B1FF]' : 'bg-gray-800'
          }`}
        />
      ))}
    </div>
  );

  const goStep2 = () => {
    setError('');

    if (!name.trim()) {
      setError('Ad Soyad boş olamaz.');
      return;
    }

    if (!contact.trim()) {
      setError('E-posta veya telefon boş olamaz.');
      return;
    }

    if (contactType === 'invalid') {
      setError('Geçerli bir e-posta veya telefon (05xxxxxxxxx) giriniz.');
      return;
    }

    if (!password.trim()) {
      setError('Şifre boş olamaz.');
      return;
    }

    if (!pwState.ok) {
      setError(
        'Şifre en az 8 karakter olmalı ve büyük harf, küçük harf, rakam içermelidir.'
      );
      return;
    }

    setStep(2);
  };

  const verifyOtpAndRegister = async () => {
    setError('');

    // Demo OTP: 1234
    if (otp.trim() !== '1234') {
      setError('Doğrulama kodu hatalı. Demo kod: 1234');
      return;
    }

    const demoMode = import.meta.env.VITE_DEMO_MODE === 'true';

    // Backend'e temiz payload: {name, email?, phone?, password}
    const payload: any = {
      name: name.trim(),
      password,
    };

    if (contactType === 'email') payload.email = contact.trim();
    if (contactType === 'phone')
      payload.phone = normalizeTRPhone(contact.trim());

    if (demoMode) {
      // Demo modda backend yok; başarılı kabul et
      setStep(3);
      return;
    }

    try {
      setLoading(true);
      await authApi.register(payload);
      setStep(3);
    } catch (e: any) {
      setError(e?.message || 'Kayıt oluşturulamadı.');
    } finally {
      setLoading(false);
    }
  };

  // STEP 1
  if (step === 1) {
    return (
      <div className="flex flex-col h-full relative overflow-hidden px-8 pt-12">
        <AuthBackground />

        <div className="z-10">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={onLoginClick}
              className="text-gray-400 text-sm flex items-center gap-1"
            >
              <div className="w-4 h-4">
                <Icons.ChevronLeft />
              </div>
              Giriş
            </button>
            <span className="text-gray-500 text-xs font-bold">ADIM 1/3</span>
          </div>

          <ProgressBar />

          <h1 className="text-3xl font-bold text-white mb-2">Hesap Oluştur</h1>

          <div className="space-y-4 mt-8">
            <NeonInput
              label="Ad Soyad"
              type="text"
              placeholder="Ali Yılmaz"
              icon={Icons.User}
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />

            <NeonInput
              label="E-Posta veya Telefon"
              type="text"
              placeholder="mail@ornek.com veya 05xxxxxxxxx"
              icon={Icons.User}
              value={contact}
              onChange={(e: any) => {
                const raw = e.target.value as string;
                const looksLikePhone = /^\d/.test(raw.trim());
                setContact(looksLikePhone ? formatTRPhone(raw) : raw);
              }}
            />

            <NeonInput
              label="Şifre"
              type="password"
              placeholder="Örn: Abcdef12"
              icon={Icons.Lock}
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />

            {/* Şifre kuralları (kullanıcıya şeffaf göstermek için) */}
            <div className="text-xs text-gray-400 space-y-1">
              <div className={pwState.rules.min8 ? 'text-green-400' : ''}>
                • En az 8 karakter
              </div>
              <div className={pwState.rules.upper ? 'text-green-400' : ''}>
                • En az 1 büyük harf (A-Z)
              </div>
              <div className={pwState.rules.lower ? 'text-green-400' : ''}>
                • En az 1 küçük harf (a-z)
              </div>
              <div className={pwState.rules.digit ? 'text-green-400' : ''}>
                • En az 1 rakam (0-9)
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-5 text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-xl p-3">
              {error}
            </div>
          )}

          <button
            onClick={goStep2}
            className="w-full mt-8 py-4 rounded-2xl bg-[#07B1FF] text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#32E0C4] transition-all"
          >
            Devam Et
            <div className="w-5 h-5">
              <Icons.ArrowRight />
            </div>
          </button>
        </div>
      </div>
    );
  }

  // STEP 2
  if (step === 2) {
    return (
      <div className="flex flex-col h-full relative overflow-hidden px-8 pt-12">
        <AuthBackground />

        <div className="z-10">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setStep(1)}
              className="text-gray-400 flex items-center gap-1"
            >
              <div className="w-5 h-5">
                <Icons.ChevronLeft />
              </div>
            </button>
            <span className="text-gray-500 text-xs font-bold">ADIM 2/3</span>
          </div>

          <ProgressBar />

          <div className="text-center mt-8 mb-8">
            <div className="w-16 h-16 bg-[#121826] border border-white/10 rounded-2xl mx-auto flex items-center justify-center mb-4 text-[#07B1FF]">
              <div className="w-8 h-8">
                <Icons.Smartphone />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white">Doğrulama</h1>
            <p className="text-gray-400 mt-2 text-sm">
              Demo Kodu: <span className="text-white font-bold">1234</span>
            </p>

            <p className="text-gray-500 mt-2 text-xs">
              {contactType === 'phone'
                ? 'Telefon numaranıza doğrulama kodu gönderildi (demo).'
                : 'E-posta adresinize doğrulama kodu gönderildi (demo).'}
            </p>
          </div>

          <NeonInput
            label="Doğrulama Kodu"
            type="text"
            placeholder="1234"
            value={otp}
            onChange={(e: any) => setOtp(e.target.value)}
            maxLength={4}
          />

          {error && (
            <div className="mt-5 text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-xl p-3">
              {error}
            </div>
          )}

          <button
            onClick={verifyOtpAndRegister}
            disabled={loading}
            className="w-full mt-8 py-4 rounded-2xl bg-white text-black font-bold text-lg hover:bg-gray-200 transition-all disabled:opacity-50"
          >
            {loading ? 'Doğrulanıyor...' : 'Doğrula'}
          </button>
        </div>
      </div>
    );
  }

  // STEP 3
  if (step === 3) {
    return (
      <div className="flex flex-col items-center justify-center h-full relative overflow-hidden px-8 text-center">
        <div className="absolute inset-0 bg-[#07B1FF]/10 z-0" />

        <div className="z-10 relative">
          <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.5)] mb-8 mx-auto animate-bounce">
            <div className="w-16 h-16 text-black">
              <Icons.CheckCircle />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">Hoş Geldin!</h1>
          <p className="text-gray-300 mb-10">Hesabın hazır.</p>

          <button
            onClick={onComplete}
            className="w-full py-4 rounded-2xl bg-white text-black font-bold text-lg shadow-xl hover:scale-105 transition-transform"
          >
            Keşfetmeye Başla
          </button>
        </div>
      </div>
    );
  }

  return null;
}
