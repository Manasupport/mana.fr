
import React, { useEffect } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import LogoAnimation from '@/components/LogoAnimation';
import { Rocket, PenTool, Cpu, GraduationCap, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  // Function to create staggered animation for the content sections
  useEffect(() => {
    const revealSections = document.querySelectorAll('.reveal-section');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealSections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      revealSections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden text-white">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Main Content */}
      <main className="w-full max-w-4xl mx-auto px-6 py-12 relative z-10 space-y-16">
        {/* Logo Section */}
        <LogoAnimation className="mx-auto mb-16" />

        {/* Hero Section */}
        <div className="text-center space-y-8 reveal-section">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white">
            Bienvenue dans l'ère Mana ! <Rocket className="inline-block ml-2 mb-1" />
          </h1>
          <p className="text-xl md:text-2xl text-white font-light max-w-2xl mx-auto">
            La page mana.fr est en construction, pour patienter voici le nouvel univers Mana dans lequel gravitent nos expertises :
          </p>
        </div>

        {/* Services Section */}
        <div className="grid md:grid-cols-3 gap-8 reveal-stagger">
          {/* Manadvise */}
          <div className="glass-card p-6 relative group hover:scale-105 transition-transform duration-300 border-2 border-white/30">
            <img src="/dviseblc.png" alt="Manadvise Logo" className="h-12 mx-auto mb-4" />
            <PenTool className="h-8 w-8 text-[#00a5b4] mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 text-white">Manadvise</h3>
            <p className="text-white">
              Conseil & recherche de pointe pour relever les défis de l'innovation.
            </p>
          </div>

          {/* Manamind */}
          <div className="glass-card p-6 relative group hover:scale-105 transition-transform duration-300 border-2 border-white/30">
            <img src="/mindblc.png" alt="Manamind Logo" className="h-12 mx-auto mb-4" />
            <Cpu className="h-8 w-8 text-[#71c088] mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 text-white">Manamind</h3>
            <p className="text-white">
              Une app nouvelle génération qui booste l'engagement et les compétences.
            </p>
            <div className="mt-4">
              <a href="https://www.manamind.fr" target="_blank" rel="noopener noreferrer">
                <Button 
                  className="bg-mana-green hover:bg-mana-light-green text-white font-bold button-hover transition-all duration-300 w-full"
                >
                  Essayer maintenant
                </Button>
              </a>
            </div>
          </div>

          {/* Manacademy */}
          <div className="glass-card p-6 relative group hover:scale-105 transition-transform duration-300 border-2 border-white/30">
            <img src="/cademyblc.png" alt="Manacademy Logo" className="h-12 mx-auto mb-4" />
            <GraduationCap className="h-8 w-8 text-[#dfaf2c] mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 text-white">Manacademy</h3>
            <p className="text-white">
              Un hub de formation et d'innovation pédagogique pour des apprentissages à fort impact.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center space-y-6 reveal-section">
          <div className="glass-card p-6 max-w-md mx-auto border-2 border-white/30">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              Contact
            </h2>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className="text-mana-green" size={20} />
              <a href="mailto:contact@mana.fr" className="text-white hover:text-mana-green transition-colors">
                contact@mana.fr
              </a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Phone className="text-mana-green" size={20} />
              <a href="tel:+33614031728" className="text-white hover:text-mana-green transition-colors">
                06 14 03 17 28
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center pt-16 reveal-section">
          <img src="/manablc.png" alt="Mana Logo" className="h-12 mx-auto mb-4" />
          <p className="text-white text-sm font-medium tracking-wider">
            Mana for Meaningful Innovation
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
