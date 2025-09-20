import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-[#0c3d5e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mana Group */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-white to-mana-accent rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold">Mana</span>
            </div>
            <p className="text-white/80 text-sm">
              Meaningful Innovation
            </p>
          </div>

          {/* Entités */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t('footer.activities')}</h3>
            <div className="space-y-2">
              <Link 
                to="/manamind" 
                className="block text-white/80 hover:text-manamind transition-colors"
              >
                Manamind → SaaS
              </Link>
              <Link 
                to="/manacademy" 
                className="block text-white/80 hover:text-manacademy transition-colors"
              >
                Manacademy → Formation
              </Link>
              <Link 
                to="/manadvise" 
                className="block text-white/80 hover:text-manadvise transition-colors"
              >
                Manadvise → Conseil
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t('footer.contact')}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-white/60" />
                <span className="text-white/80 text-sm">contact@mana.fr</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-white/60" />
                <span className="text-white/80 text-sm">+33 6 14 03 17 28</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-white/60" />
                <span className="text-white/80 text-sm">Paris, France</span>
              </div>
            </div>
            <Button variant="glass" size="sm" className="w-full">
              {t('footer.contact')}
            </Button>
          </div>
        </div>

        <div className="border-t border-white/20 mt-10 pt-6 text-center">
          <p className="text-white/60 text-sm">
            © 2024 Mana. {t('footer.allRightsReserved')}. Meaningful Innovation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
