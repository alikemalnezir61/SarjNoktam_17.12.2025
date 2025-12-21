import React, { useState } from "react";

const PrivacyModal: React.FC<{ onAccept: () => void }> = ({ onAccept }) => {
  const [show, setShow] = useState(true);
  return show ? (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
        <h2 className="text-xl font-bold text-[#07B1FF] mb-4">Gizlilik Politikası</h2>
        <div className="text-gray-700 mb-4" style={{whiteSpace: 'pre-line'}}>
          Kullanıcı verileriniz KVKK ve GDPR kapsamında korunmaktadır.
          Verileriniz sadece açık rızanız ile işlenir ve paylaşılır.
          Dilediğiniz zaman verilerinizi silebilir veya anonimleştirebilirsiniz.
          Daha fazla bilgi için destek ekibimize ulaşabilirsiniz.
        </div>
        <button className="mt-2 py-2 rounded bg-[#07B1FF] text-black font-bold w-full" onClick={() => { setShow(false); onAccept(); }}>
          Kabul Ediyorum
        </button>
      </div>
    </div>
  ) : null;
};

export default PrivacyModal;
