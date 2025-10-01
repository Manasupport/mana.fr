import { Link } from "react-router-dom";
// Button removed — footer uses anchor CTA instead
import { Mail, MapPin, Phone, Instagram, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-t from-[#052431] via-[#083147] to-[#0c3d5e] text-white">
      {/* subtle animated waves (reduced height/opacity for compact footer) */}
      <div className="pointer-events-none absolute -top-16 left-0 w-full h-44 opacity-8">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 200">
          <path d="M0,120 C300,200 900,40 1200,120 L1200,200 L0,200 Z" fill="url(#g)" />
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0%" stopColor="#0c3d5e" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#052431" stopOpacity="0.18" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Brand / Animated logo */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img src="/manasloganblc.png" alt="Mana" className="h-12 w-auto object-contain" />
            </div>

            <p className="text-sm text-white/70 max-w-md">
              {t('footer.about', 'Nous aidons organisations & écoles à innover, former et transformer.' )}
            </p>

            <div className="flex items-center gap-3 mt-2">
              <a aria-label="LinkedIn" href="https://www.linkedin.com/company/manadvise/" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/6 hover:bg-white/12 transition">
                <Linkedin className="w-6 h-6 text-white/90" />
              </a>
              <a aria-label="Instagram" href="https://www.instagram.com/manadvise/" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/6 hover:bg-white/12 transition">
                <Instagram className="w-6 h-6 text-white/90" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-semibold mb-3">Nos activités</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <Link to="/manamind" className="hover:text-manamind transition-colors">Manamind → SaaS</Link>
                </li>
                <li>
                  <Link to="/manacademy" className="hover:text-manacademy transition-colors">Manacademy → Formation</Link>
                </li>
                <li>
                  <Link to="/manadvise" className="hover:text-manadvise transition-colors">Manadvise → Conseil</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3">Ressources</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <Link to="/resources" className="hover:text-manamind transition-colors">Fiches & outils</Link>
                </li>
                <li>
                  <Link to="/publications" className="hover:text-manadvise transition-colors">Articles & publications</Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-manacademy transition-colors">Contact</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact / CTA */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-white font-semibold mb-3">Contact</h4>
              <div className="flex flex-col gap-3 text-sm text-white/80 mb-4">
                <a className="flex items-center gap-2 hover:text-white transition" href="mailto:contact@mana.fr">
                  <Mail className="w-4 h-4 text-white/80" />
                  <span>contact@mana.fr</span>
                </a>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-white/80" />
                  <span>+33 6 14 03 17 28</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-white/80" />
                  <span>Paris, France</span>
                </div>
              </div>

              {/* CTA removed per request */}
            </div>

            <div className="mt-4 text-sm text-white/60">
              <div className="mb-1">© {new Date().getFullYear()} Mana. {t('footer.allRightsReserved')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* bottom wave gradient */}
  <div className="h-4 w-full bg-gradient-to-t from-[#041e26] to-transparent opacity-36" />
    </footer>
  );
};

export default Footer;
