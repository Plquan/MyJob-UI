import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type SupportedLanguage = 'vi' | 'en';

export interface Translation {
  [key: string]: string | Translation;
}

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  t: (key: string) => string;
  translations: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('vi');
  const [translations, setTranslations] = useState<Translation>({});

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as SupportedLanguage;
    if (savedLanguage && (savedLanguage === 'vi' || savedLanguage === 'en')) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationModule = await import(`../../assets/translation/${currentLanguage}.json`);
        setTranslations(translationModule.default || translationModule);
      } catch (error) {
        console.error(`Failed to load translations for ${currentLanguage}:`, error);
        if (currentLanguage !== 'vi') {
          try {
            const fallbackModule = await import(`../../assets/translation/vi.json`);
            setTranslations(fallbackModule.default || fallbackModule);
          } catch (fallbackError) {
            console.error('Failed to load fallback translations:', fallbackError);
            setTranslations({});
          }
        }
      }
    };

    loadTranslations();
  }, [currentLanguage]);

  const setLanguage = (language: SupportedLanguage) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; 
      }
    }

    return typeof value === 'string' ? value : key;
  };

  const contextValue: LanguageContextType = {
    currentLanguage,
    setLanguage,
    t,
    translations,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useTranslation = () => {
  const { t, currentLanguage } = useLanguage();
  return { t, currentLanguage };
};
