import { useEffect, useRef } from "react";

const PartnerCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const partners = [
    { name: "Dauphine", logo: "/dauphine.png" },
    { name: "EM", logo: "/em.png" },
    { name: "ENPC", logo: "/enpc.png" },
    { name: "ESCP", logo: "/escp.png" },
    { name: "Mines", logo: "/mines.png" },
    { name: "Skema", logo: "/skema.png" },
    { name: "Polytechnique", logo: "/x1.png" },
  ];

  // Duplicate logos for seamless looping
  const scrollingPartners = [...partners, ...partners];

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let animationId: number;

    const step = () => {
      el.scrollLeft += 1;
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="py-16 bg-[#0C3D5E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ils nous font confiance
        </h2>
        <p className="text-white/80 mb-12">
          Les plus grandes institutions éducatives utilisent Manamind
        </p>

        <div className="overflow-hidden w-full" ref={carouselRef}>
          <div className="flex space-x-12 w-max animate-none">
            {scrollingPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 bg-[#0C3D5E] rounded-lg p-4"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-14 w-32 object-contain invert brightness-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerCarousel;
