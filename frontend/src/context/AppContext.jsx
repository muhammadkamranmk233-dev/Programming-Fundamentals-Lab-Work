import { createContext, useContext, useMemo, useState } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [theme, setTheme] = useState('light');

  const value = useMemo(
    () => ({ favorites, setFavorites, compareList, setCompareList, theme, setTheme }),
    [favorites, compareList, theme]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
