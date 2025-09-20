import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface EntityCardProps {
  name: string;
  tagline: string;
  description: string;
  color: "manamind" | "manacademy" | "manadvise";
  link: string;
  externalLink?: string;
  icon?: React.ReactNode;
}

const EntityCard = ({
  name,
  tagline,
  description,
  color,
  link,
  externalLink,
  icon,
}: EntityCardProps) => {
  const colorVariants = {
    manamind: {
      gradient: "from-manamind-light to-white",
      button: "manamind" as const,
      accent: "border-manamind/20 hover:border-manamind/40",
      text: "text-manamind-dark",
      badgeText: "Application Edtech",
      suffix: "mind",
      suffixHex: "#71c088",
    },
    manacademy: {
      gradient: "from-manacademy-light to-white",
      button: "manacademy" as const,
      accent: "border-manacademy/20 hover:border-manacademy/40",
      text: "text-manacademy-dark",
      badgeText: "Formation",
      suffix: "cademy",
      suffixHex: "#dfaf2c",
    },
    manadvise: {
      gradient: "from-manadvise-light to-white",
      button: "manadvise" as const,
      accent: "border-manadvise/20 hover:border-manadvise/40",
      text: "text-manadvise-dark",
      badgeText: "Conseil",
      suffix: "dvise",
      suffixHex: "#00a5b4",
    },
  };

  const variant = colorVariants[color];

  // Mise en évidence de la terminaison
  let prefix = name;
  let suffixColored = "";
  const lowerName = name.toLowerCase();
  const lowerSuffix = variant.suffix.toLowerCase();
  const idx = lowerName.lastIndexOf(lowerSuffix);
  if (idx >= 0) {
    prefix = name.slice(0, idx);
    suffixColored = name.slice(idx);
  }

  const scriptStyle: React.CSSProperties = {
    fontFamily: "'Segoe Script','Segoe Print','Bradley Hand',cursive",
    fontWeight: 700,
    color: "#0C3D5E",
    letterSpacing: "-0.01em",
  };

  return (
    <div
      className={`entity-card group bg-gradient-to-br ${variant.gradient} border ${variant.accent} relative overflow-hidden rounded-3xl p-8 flex flex-col justify-between`}
    >
      <div>
        {/* Pastille top-right */}
        <div
          className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-medium border"
          style={{
            backgroundColor: `${variant.suffixHex}1A`,
            borderColor: `${variant.suffixHex}55`,
            color: "#0C3D5E",
          }}
        >
          {variant.badgeText}
        </div>

        {/* Halo */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
          <div className="w-full h-full rounded-full translate-x-8 -translate-y-8 bg-white" />
        </div>

        {/* Icône */}
        {icon && (
          <div
            className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${variant.text} mb-6`}
            style={{ backgroundColor: `${variant.suffixHex}1A` }}
          >
            {icon}
          </div>
        )}

        {/* Titre */}
        <h3 className="text-3xl font-bold text-primary mb-2">
          {prefix}
          <span style={{ color: variant.suffixHex }}>{suffixColored}</span>
        </h3>

        {/* Tagline */}
        <div
          className="mb-3 leading-tight text-[18px] md:text-[20px] -mt-1"
          style={scriptStyle}
        >
          {tagline}
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          {description}
        </p>
      </div>

      {/* Actions toujours en bas */}
      <div className="mt-auto flex flex-col sm:flex-row gap-3">
        <Button variant={variant.button} size="sm" asChild className="flex-1">
          <Link to={link}>
            En savoir plus
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>

        {externalLink && (
          <Button variant="outline" size="sm" asChild className="flex-1">
            <a href={externalLink} target="_blank" rel="noopener noreferrer">
              Site web
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};

export default EntityCard;
