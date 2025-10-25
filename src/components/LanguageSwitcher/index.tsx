import React from 'react';
import { useLanguage, type SupportedLanguage, } from '../../provider/Languages';

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, setLanguage } = useLanguage();

  const handleLanguageChange = (language: SupportedLanguage) => {
    setLanguage(language);
  };

  return (
    <div className="flex items-center space-x-2 text-sm font-medium">
      <span
        className={`cursor-pointer transition-colors ${
          currentLanguage === 'en' 
            ? 'text-gray-800 font-semibold' 
            : 'text-gray-400 hover:text-gray-600'
        }`}
        onClick={() => handleLanguageChange('en')}
      >
        EN
      </span>
      <span className="text-gray-300">|</span>
      <span
        className={`cursor-pointer transition-colors ${
          currentLanguage === 'vi' 
            ? 'text-gray-800 font-semibold' 
            : 'text-gray-400 hover:text-gray-600'
        }`}
        onClick={() => handleLanguageChange('vi')}
      >
        VI
      </span>
    </div>
  );
};

export default LanguageSwitcher;
