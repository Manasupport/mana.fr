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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-3 text-sm font-medium hover:bg-white/10 text-white border border-white/20 rounded-full"
          aria-label="Language switcher"
        >
          <Globe className="h-4 w-4 mr-2" />
          {currentLanguage === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="min-w-[120px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg z-50"
      >
        <DropdownMenuItem
          onClick={() => changeLanguage('fr')}
          className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
            currentLanguage === 'fr' ? 'bg-gray-100 dark:bg-gray-700' : ''
          }`}
        >
          🇫🇷 Français
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage('en')}
          className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
            currentLanguage === 'en' ? 'bg-gray-100 dark:bg-gray-700' : ''
          }`}
        >
          🇬🇧 English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;