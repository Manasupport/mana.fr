import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ContactModal from "./ContactModal";
import LanguageSwitcher from "./LanguageSwitcher";
import manaLogo from "@/assets/logomana.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activitiesOpen, setActivitiesOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const handler = () => setActivitiesOpen(true);
    window.addEventListener("openActivitiesMenu", handler as EventListener);
    return () => window.removeEventListener("openActivitiesMenu", handler as EventListener);
  }, []);

  const activitiesItems = [
    { href: "/manadvise", imgSrc: "/manadvise.png", alt: "Manadvise", color: "#00a5b4" },
    { href: "/manamind", imgSrc: "/manamind.png", alt: "Manamind", color: "#71c088" },
    { href: "/manacademy", imgSrc: "/manacademy.png", alt: "Manacademy", color: "#dfaf2c" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={manaLogo} alt="Mana - Meaningful innovation" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`relative px-1 py-1 text-base font-medium transition-all duration-300 group hover:scale-[1.03]
                ${location.pathname === "/" ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"}`}
            >
              {t("navigation.home")}
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>

            <Link
              to="/a-propos"
              className={`relative px-1 py-1 text-base font-medium transition-all duration-300 group hover:scale-[1.03]
                ${location.pathname === "/a-propos" ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"}`}
            >
              {t("navigation.about")}
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>

            {/* Nos activités */}
            <DropdownMenu open={activitiesOpen} onOpenChange={setActivitiesOpen}>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-transform group hover:scale-[1.03]">
                <span>{t("navigation.activities")}</span>
                <ChevronDown className="h-4 w-4" />
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-300"></span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-border shadow-lg">
                {activitiesItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild onClick={() => setActivitiesOpen(false)}>
                    <Link
                      to={item.href}
                      className="flex items-center px-4 py-2 hover:bg-muted transition-colors"
                      style={{ "--highlight-color": item.color } as React.CSSProperties}
                    >
                      <img src={item.imgSrc} alt={item.alt} className="h-6 w-auto" />
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/resources"
              className={`relative px-1 py-1 text-base font-medium transition-all duration-300 group hover:scale-[1.03]
                ${location.pathname.startsWith("/resources") ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"}`}
            >
              {t("navigation.resources")}
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>

            <Link
              to="/indice-maturite"
              className={`relative px-1 py-1 text-base font-medium transition-all duration-300 group hover:scale-[1.03]
                ${location.pathname === "/indice-maturite" ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"}`}
            >
              Indice de Maturité
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>

            <Link
              to="/nous-rejoindre"
              className={`relative px-1 py-1 text-base font-medium transition-all duration-300 group hover:scale-[1.03]
                ${location.pathname === "/nous-rejoindre" ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"}`}
            >
              {t("navigation.join")}
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Contact + Langue (ordre inversé → langue APRÈS contact) */}
          <div className="hidden md:flex items-center space-x-3">
            <ContactModal>
              <Button size="sm" className="bg-[#0c3d5e] text-white hover:bg-[#0a2f4a] transition-colors">
                {t("navigation.contact")}
              </Button>
            </ContactModal>
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-border shadow-lg z-40">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {/* Liens */}
              <Link to="/" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname === "/" ? "text-primary bg-muted" : "text-muted-foreground hover:text-primary hover:bg-muted"}`}>
                {t("navigation.home")}
              </Link>
              <Link to="/a-propos" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname === "/a-propos" ? "text-primary bg-muted" : "text-muted-foreground hover:text-primary hover:bg-muted"}`}>
                {t("navigation.about")}
              </Link>

              {/* Activités */}
              <div className="pt-2">
                <div className="px-3 py-2 text-sm font-medium text-muted-foreground">{t("navigation.activities")}</div>
                {activitiesItems.map((item) => (
                  <Link key={item.href} to={item.href} onClick={() => setIsOpen(false)} className="block px-6 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted transition-colors">
                    <img src={item.imgSrc} alt={item.alt} className="h-5 w-auto" />
                  </Link>
                ))}
              </div>

              <Link to="/resources" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname.startsWith("/resources") ? "text-primary bg-muted" : "text-muted-foreground hover:text-primary hover:bg-muted"}`}>
                {t("navigation.resources")}
              </Link>

              <Link to="/indice-maturite" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname === "/indice-maturite" ? "text-primary bg-muted" : "text-muted-foreground hover:text-primary hover:bg-muted"}`}>
                Indice de Maturité
              </Link>

              <Link to="/nous-rejoindre" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname === "/nous-rejoindre" ? "text-primary bg-muted" : "text-muted-foreground hover:text-primary hover:bg-muted"}`}>
                {t("navigation.join")}
              </Link>

              {/* Langue & Contact en mobile (même ordre que desktop) */}
              <div className="pt-3 space-y-3">
                <ContactModal>
                  <Button size="sm" className="w-full bg-[#0c3d5e] text-white hover:bg-[#0a2f4a] transition-colors">
                    {t("navigation.contact")}
                  </Button>
                </ContactModal>
                <div className="px-3">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
