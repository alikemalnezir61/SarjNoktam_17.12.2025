import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Icons } from '../ui/Icons'; // İkonların yolu doğru olsun

type ModalType = 'alert' | 'confirm' | 'prompt';

interface ModalState {
  isOpen: boolean;
  type: ModalType;
  title: string;
  message: string;
  onConfirm?: (inputValue?: string) => void;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean; // Silme işlemleri için kırmızı buton
}

interface ModalContextType {
  showAlert: (title: string, message: string, onOk?: () => void) => void;
  showConfirm: (title: string, message: string, onConfirm: () => void, isDanger?: boolean) => void;
  showPrompt: (title: string, message: string, onConfirm: (val: string) => void) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    type: 'alert',
    title: '',
    message: '',
  });
  const [promptValue, setPromptValue] = useState('');

  const close = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
    setPromptValue('');
  };

  const showAlert = (title: string, message: string, onOk?: () => void) => {
    setModal({
      isOpen: true, type: 'alert', title, message,
      onConfirm: () => { onOk?.(); close(); },
      confirmText: 'Tamam'
    });
  };

  const showConfirm = (title: string, message: string, onConfirm: () => void, isDanger = false) => {
    setModal({
      isOpen: true, type: 'confirm', title, message, isDanger,
      onConfirm: () => { onConfirm(); close(); },
      confirmText: isDanger ? 'Sil / Onayla' : 'Evet',
      cancelText: 'Vazgeç'
    });
  };

  const showPrompt = (title: string, message: string, onConfirm: (val: string) => void) => {
    setPromptValue('');
    setModal({
      isOpen: true, type: 'prompt', title, message,
      onConfirm: (val) => { onConfirm(val || ''); close(); },
      confirmText: 'Onayla',
      cancelText: 'İptal'
    });
  };

  return (
    <ModalContext.Provider value={{ showAlert, showConfirm, showPrompt }}>
      {children}
      
      {/* --- GLOBAL MODAL UI --- */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-6">
          {/* Arka Plan (Blur) */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" 
            onClick={close} 
          />
          
          {/* Pencere */}
          <div className="bg-[#1e293b] border border-white/10 w-full max-w-sm rounded-3xl p-6 relative z-10 shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col items-center">
             
             {/* İkon */}
             <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${modal.isDanger ? 'bg-red-500/20 text-red-500' : 'bg-[#07B1FF]/20 text-[#07B1FF]'}`}>
                {modal.isDanger ? <Icons.Trash className="w-8 h-8" /> : (modal.type === 'prompt' ? <Icons.Edit className="w-8 h-8" /> : <Icons.Zap className="w-8 h-8" />)}
             </div>

             <h3 className="text-xl font-bold text-white text-center mb-2">{modal.title}</h3>
             <p className="text-gray-400 text-center text-sm mb-6 leading-relaxed">{modal.message}</p>

             {/* Prompt Input */}
             {modal.type === 'prompt' && (
               <input 
                 type="text" 
                 autoFocus
                 className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white mb-6 text-center focus:border-[#07B1FF] outline-none transition-colors"
                 value={promptValue}
                 onChange={(e) => setPromptValue(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && modal.onConfirm?.(promptValue)}
               />
             )}

             <div className="flex gap-3 w-full">
               {modal.type !== 'alert' && (
                 <button 
                   onClick={close} 
                   className="flex-1 py-3 bg-gray-700/50 hover:bg-gray-700 text-gray-300 rounded-xl font-bold text-sm transition-colors"
                 >
                   {modal.cancelText || 'Vazgeç'}
                 </button>
               )}
               <button 
                 onClick={() => modal.onConfirm?.(promptValue)} 
                 className={`flex-1 py-3 rounded-xl font-bold text-sm transition-transform active:scale-95 text-white ${modal.isDanger ? 'bg-red-500 hover:bg-red-600' : 'bg-[#07B1FF] hover:bg-[#0590d1] text-black'}`}
               >
                 {modal.confirmText || 'Tamam'}
               </button>
             </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

// Hook'u dışarı açıyoruz
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};