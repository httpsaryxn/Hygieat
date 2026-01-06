import React, { createContext, ReactNode, useContext, useState } from 'react';

type Theme = 'light' | 'dark';

interface UserContextType {
  profileIcon: string;
  setProfileIcon: (icon: string) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profileIcon, setProfileIcon] = useState('person-circle');
  const [theme, setTheme] = useState<Theme>('dark');

  return (
    <UserContext.Provider value={{ profileIcon, setProfileIcon, theme, setTheme }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
