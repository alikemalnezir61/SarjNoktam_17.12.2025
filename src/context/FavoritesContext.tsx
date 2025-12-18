import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Favori istasyonlar için context tipi
interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (stationId: string) => void;
  isFavorite: (stationId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    // Yerel depolamadan yükle (isteğe bağlı)
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  const toggleFavorite = (stationId: string) => {
    setFavorites(prev => {
      let updated;
      if (prev.includes(stationId)) {
        updated = prev.filter(id => id !== stationId);
      } else {
        updated = [...prev, stationId];
      }
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (stationId: string) => favorites.includes(stationId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
