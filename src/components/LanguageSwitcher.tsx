import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;
  // SVG flags for universal rendering
  const FlagFR = () => (
    <svg width="20" height="14" viewBox="0 0 20 14" className="mr-2" aria-hidden="true"><rect width="20" height="14" rx="3" fill="#fff"/><rect width="6.67" height="14" rx="3" fill="#0055A4"/><rect x="13.33" width="6.67" height="14" rx="3" fill="#EF4135"/></svg>
  );
  // Union Jack (UK flag)
  const FlagEN = () => (
    <svg width="20" height="14" viewBox="0 0 20 14" className="mr-2" aria-hidden="true">
      <rect width="20" height="14" rx="3" fill="#012169"/>
      <g>
        <path d="M0 0L20 14M20 0L0 14" stroke="#fff" strokeWidth="2.2"/>
        <path d="M0 0L20 14M20 0L0 14" stroke="#C8102E" strokeWidth="1.1"/>
      </g>
      <rect x="8.2" width="3.6" height="14" fill="#fff"/>
      <rect y="5.2" width="20" height="3.6" fill="#fff"/>
      <rect x="9.1" width="1.8" height="14" fill="#C8102E"/>
      <rect y="6.1" width="20" height="1.8" fill="#C8102E"/>
    </svg>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-4 text-sm font-semibold flex items-center gap-2 border border-white/30 rounded-full shadow-sm bg-gradient-to-r from-white/60 to-white/30 dark:from-gray-900/60 dark:to-gray-800/30 hover:scale-105 hover:shadow-lg transition-all duration-200"
          aria-label="Language switcher"
        >
          <Globe className="h-4 w-4 mr-1 opacity-80" />
          {currentLanguage === 'fr' ? <FlagFR /> : <FlagEN />}
          <span className="tracking-wide">{currentLanguage === 'fr' ? 'FR' : 'EN'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="min-w-[140px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl rounded-xl mt-2 py-2 z-50"
      >
        <DropdownMenuItem
          onClick={() => changeLanguage('fr')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-150 text-sm font-medium ${
            currentLanguage === 'fr' ? 'bg-manacademy-light/30 dark:bg-manacademy-light/20 ring-2 ring-manacademy-light' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <FlagFR />
          <span>Français</span>
          {currentLanguage === 'fr' && <span className="ml-auto text-xs text-manacademy-dark font-bold">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage('en')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-150 text-sm font-medium ${
            currentLanguage === 'en' ? 'bg-manacademy-light/30 dark:bg-manacademy-light/20 ring-2 ring-manacademy-light' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <FlagEN />
          <span>English</span>
          {currentLanguage === 'en' && <span className="ml-auto text-xs text-manacademy-dark font-bold">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
