import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Globe className="w-4 h-4" />
        <span>{currentLanguage.flag}</span>
        <span>{currentLanguage.label}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                i18n.changeLanguage(language.code);
                setIsOpen(false);
              }}
              className={`flex items-center w-full px-4 py-2 text-sm ${
                i18n.language === language.code
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="mr-2">{language.flag}</span>
              <span>{language.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
