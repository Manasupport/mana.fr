// src/pages/ArticleDetail.tsx
import { useMemo, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Download,
  Bookmark,
  Sparkles,
  Target,
  Leaf,
  Building2,
  GraduationCap,
  Zap,
  Quote as QuoteIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

/* ------------------------------------------------------------------ */
/*                     Util: construire l'URL publique                 */
/* ------------------------------------------------------------------ */
const publicUrl = (path: string) => {
  const base = import.meta.env.BASE_URL ?? "/";
  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
};

/* ------------------------------------------------------------------ */
/*                     Service Resend pour notifications email         */
/* ------------------------------------------------------------------ */
interface ManaguideDownloadData {
  email: string;
  firstName: string;
  lastName: string;
  downloadedAt: string;
  userAgent: string;
}

const sendManaguideNotification = async (userData: ManaguideDownloadData) => {
  try {
    const response = await fetch('/api/send-managuide-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('✅ Email de notification envoyé:', result);
    return result;
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
    throw error;
  }
};

const sendWelcomeEmail = async (userData: { email: string; firstName: string; lastName: string }) => {
  try {
    const response = await fetch('/api/send-welcome-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('✅ Email de bienvenue envoyé:', result);
    return result;
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email de bienvenue:', error);
    throw error;
  }
};

/* ------------------------------------------------------------------ */
/*                    Helpers couleurs & assets                        */
/* ------------------------------------------------------------------ */

type Thematic = "Innovation" | "Stratégie" | "RSE" | "Autres";

const THEME = {
  Innovation: {
    chip: "bg-manamind/10 text-manamind border-manamind/20",
    halo: "from-manamind/20 to-manamind-light/30",
    icon: <Sparkles className="h-4 w-4" />,
  },
  Stratégie: {
    chip: "bg-manadvise/10 text-manadvise border-manadvise/20",
    halo: "from-manadvise/20 to-manadvise-light/30",
    icon: <Target className="h-4 w-4" />,
  },
  RSE: {
    chip: "bg-manacademy/10 text-manacademy border-manacademy/20",
    halo: "from-manacademy/20 to-manacademy-light/30",
    icon: <Leaf className="h-4 w-4" />,
  },
  Autres: {
    chip: "bg-muted/60 text-muted-foreground",
    halo: "from-muted/20 to-muted/30",
    icon: <Bookmark className="h-4 w-4" />,
  },
} as const;

/** Couverture = même nom que le PDF mais en .jpg, même dossier /public/pdfs/ */
const coverFromPdfFile = (pdfFile: string) =>
  publicUrl(`pdfs/${pdfFile.replace(/\.pdf$/i, ".jpg")}`);

/* ------------------------------------------------------------------ */
/*                          Data articles                              */
/* ------------------------------------------------------------------ */

type Article = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  thematic: Thematic;
  type: string;
  file: string; // ex: "the-future-of-luxury.pdf" dans public/pdfs/
  publishedAt?: string;
};

const ARTICLES: Article[] = [
  {
    id: 6,
    slug: "operational-efficiency-em",
    title: "Operational Efficiency at EM Normandie",
    excerpt:
      "Préparer les étudiants aux réalités opérationnelles : outils, cas concrets et posture pro.",
    thematic: "Stratégie",
    type: "Cours",
    file: "operational-efficiency-em.pdf",
    publishedAt: "Publié le 17 juin 2021",
  },
  {
    id: 5,
    slug: "sustainable-cities",
    title: "Sustainable Cities: an Interdisciplinary Challenge",
    excerpt:
      "De la smart city aux villes réellement durables : croiser ingénierie, économie & gouvernance.",
    thematic: "RSE",
    type: "Étude",
    file: "sustainable-cities.pdf",
    publishedAt: "Publié le 8 juillet 2021",
  },
  {
    id: 2,
    slug: "future-of-luxury",
    title: "The Future of Luxury",
    excerpt:
      "Digital, durabilité, nouveaux modèles — ce que disent les scénarios explorés par 80 étudiants.",
    thematic: "Stratégie",
    type: "Article",
    file: "the-future-of-luxury.pdf",
    publishedAt: "Publié le 9 octobre 2022",
  },
  {
    id: 1,
    slug: "managuide-innovation",
    title: "Managuide des méthodes et outils d’innovation",
    excerpt:
      "12 méthodes essentielles, éprouvées, pour passer de l’idée à l’impact — sans bullsh*t.",
    thematic: "Innovation",
    type: "Guide",
    file: "managuide-de-l-innovation.pdf",
  },
  {
    id: 3,
    slug: "autoconsommation-collective",
    title:
      "Autoconsommation collective : quelle gouvernance pour un système énergétique décentralisé ?",
    excerpt:
      "Étude comparative sur 5 écoquartiers : modes de gouvernance, obstacles & leviers.",
    thematic: "RSE",
    type: "Étude",
    file: "autoconsommation-collective.pdf",
    publishedAt: "Temps de lecture : 7 minutes",
  },
  {
    id: 4,
    slug: "value-wheel-tool",
    title:
      "The Value Wheel: a strategic tool to measure value creation beyond financial metrics",
    excerpt:
      "Un cadre décisionnel pour piloter la valeur économique, sociale et environnementale.",
    thematic: "Stratégie",
    type: "Article",
    file: "value-wheel.pdf",
  },
  {
    id: 9,
    slug: "consultant-behaviour-escp",
    title: "Consultant Behaviour at ESCP Business School",
    excerpt:
      "Décrypter le métier : du cycle de mission aux postures — témoignage & plan de cours.",
    thematic: "Stratégie",
    type: "Cours",
    file: "consultant-behaviour-escp.pdf",
    publishedAt: "Publié le 2 juin 2021",
  },
  {
    id: 7,
    slug: "spring-2021-success",
    title: "Saison Spring 2021 : un succès renouvelé",
    excerpt:
      "Une saison rythmée par la co-innovation, entre challenges inter-écoles et projets.",
    thematic: "Stratégie",
    type: "Cours",
    file: "spring-2021-success.pdf",
    publishedAt: "Publié le 31 mai 2021",
  },
  {
    id: 8,
    slug: "elearning-environmental-impact",
    title:
      "E-learning vs. Présentiel : une évaluation de l’impact environnemental",
    excerpt:
      "LCA d’un cours : où se situent réellement les impacts — et à partir de quelle taille de classe ?",
    thematic: "RSE",
    type: "Étude",
    file: "elearning-environmental-impact.pdf",
    publishedAt: "Publié le 26 mai 2021",
  },
  {
    id: 10,
    slug: "archetypes-entreprises-innovantes",
    title: "Les archétypes d'entreprises innovantes",
    excerpt:
      "Typologie des modèles organisationnels qui favorisent l'innovation et la créativité en entreprise.",
    thematic: "Innovation",
    type: "Article",
    file: "archetypes-entreprises-innovantes.pdf",
    publishedAt: "Publié le 26 mai 2021",
  },
];

/* ------------------------------------------------------------------ */
/*                       Composants éditoriaux                         */
/* ------------------------------------------------------------------ */

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
);

const Lead = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xl md:text-2xl leading-relaxed text-slate-600 font-medium mb-8 border-l-4 border-[#dfaf2c] pl-6 bg-gradient-to-r from-[#dfaf2c]/5 to-transparent py-4 rounded-r-2xl">
    {children}
  </p>
);

const SectionTitle = ({
  icon,
  children,
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <h2 className="mt-12 mb-6 flex items-center gap-3 text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#0c3d5e] to-[#dfaf2c]">
    {icon} {children}
  </h2>
);

const Divider = () => <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />;

const Callout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-3xl border border-[#0c3d5e]/10 bg-gradient-to-br from-[#0c3d5e]/5 to-white p-8 shadow-lg backdrop-blur-sm">
    <div className="mb-4 text-[#0c3d5e] font-bold text-lg">{title}</div>
    <div className="text-base leading-relaxed text-slate-700">{children}</div>
  </div>
);

const KPIGrid = ({
  items,
}: {
  items: { label: string; value: string }[];
}) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
    {items.map((k, i) => (
      <div
        key={i}
        className="group rounded-2xl border border-white/20 bg-gradient-to-br from-white/80 to-slate-50/60 backdrop-blur-sm px-6 py-5 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
      >
        <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">
          {k.label}
        </div>
        <div className="text-2xl font-black text-[#0c3d5e] group-hover:text-[#dfaf2c] transition-colors duration-300">
          {k.value}
        </div>
      </div>
    ))}
  </div>
);

const Quote = ({ children }: { children: React.ReactNode }) => (
  <div className="relative rounded-3xl border border-white/30 bg-gradient-to-br from-white/90 to-slate-50/60 backdrop-blur-sm p-8 shadow-xl my-8">
    <QuoteIcon className="absolute -top-4 -left-4 h-8 w-8 text-[#dfaf2c] bg-white rounded-full p-1 shadow-lg" />
    <p className="text-xl leading-relaxed italic text-slate-700 font-medium">{children}</p>
  </div>
);

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li className="pl-3 leading-relaxed text-slate-700 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-gradient-to-r before:from-[#0c3d5e] before:to-[#dfaf2c] before:rounded-full">
    {children}
  </li>
);

/* ------------------------------------------------------------------ */
/*                     Corps “stylé” par article                       */
/* ------------------------------------------------------------------ */

function RichBody({ article }: { article: Article }) {
  switch (article.slug) {
    case "future-of-luxury":
  return (
    <>
      <Lead>
        In Spring 2022, <strong>Manadvise</strong> et <strong>onepoint</strong>{" "}
        ont organisé le challenge <em>Future of Luxury</em> dans un cadre
        d’open innovation. Objectif : explorer comment le secteur du luxe peut
        se réinventer à l’ère du digital, de la durabilité et des nouveaux
        modèles économiques.
      </Lead>

      <Divider />

      <KPIGrid
        items={[
          { label: "Étudiants", value: "80 (16 équipes de 5)" },
          { label: "Durée", value: "3 mois" },
          { label: "Encadrement", value: "Manadvisors + experts Onepoint" },
          { label: "Catégorie", value: "Luxe" },
          { label: "Lecture", value: "≈ 5 minutes" },
        ]}
      />

      <SectionTitle>Le contexte</SectionTitle>
      <p className="leading-relaxed">
        Jusqu’à aujourd’hui, le monde a traversé de profondes mutations
        sociales, économiques et environnementales. Crise du COVID-19,
        transformation digitale, pressions écologiques… Le luxe doit apprendre
        à conjuguer attractivité, exclusivité et responsabilité. Ce challenge a
        permis de tester de nouveaux modèles pour relever ces défis.
      </p>

      {/* Foreword */}
      <Callout title="Foreword – Gaëlle Rodrigues, Onepoint">
        « Être à jour sur les évolutions technologiques, sociétales et
        environnementales exige une vigilance constante. Le luxe doit renouveler
        ses stratégies pour rester désirable et responsable. »
      </Callout>

      <Divider />

      <SectionTitle>Chiffres clés du luxe</SectionTitle>
      <div className="my-8 overflow-hidden rounded-3xl border border-white/20 shadow-xl bg-gradient-to-b from-white/80 to-slate-50/60 backdrop-blur-sm">
        <img
          src="/1-future.png"
          alt="Chiffres clés luxe"
          className="w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <ul className="list-disc ml-5 space-y-2">
        <Bullet>
          Le marché des biens personnels de luxe a crû de{" "}
          <strong>+68%</strong> entre 2010 et 2019 (281 Mds €).
        </Bullet>
        <Bullet>
          Après la crise COVID, il a rebondi à <strong>283 Mds € en 2021</strong>.
        </Bullet>
        <Bullet>
          Le marché global du luxe est projeté à{" "}
          <strong>1,3 trillion € d’ici 2025</strong>.
        </Bullet>
      </ul>

      <Divider />

      <SectionTitle>Les 4 axes stratégiques</SectionTitle>
      <div className="my-8 overflow-hidden rounded-3xl border border-white/20 shadow-xl bg-gradient-to-b from-white/80 to-slate-50/60 backdrop-blur-sm">
        <img
          src="/2-future.png"
          alt="Axes stratégiques luxe"
          className="w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <ul className="list-disc ml-5 space-y-2">
        <Bullet>Digital au service de la durabilité</Bullet>
        <Bullet>Régénération de l’environnement et de la biodiversité</Bullet>
        <Bullet>Le produit et l’expérience luxe de demain</Bullet>
        <Bullet>Le savoir-faire et les compétences futures</Bullet>
      </ul>

      <Divider />

      <SectionTitle>Explorations étudiantes</SectionTitle>

      {/* Theme 1 */}
      <h3 className="text-lg font-semibold mt-6">
        Thème 1 — Digital for Sustainability
      </h3>
      <p className="mb-3 text-muted-foreground">
        Quels sont les opportunités et paradoxes du digital en matière de
        durabilité ? De la chaîne d’approvisionnement jusqu’aux consommateurs,
        quelles technologies clés permettent une mode plus responsable ?
      </p>
      <div className="overflow-hidden rounded-3xl border border-white/20 shadow-xl bg-gradient-to-b from-white/80 to-slate-50/60 backdrop-blur-sm p-2">
        <iframe
          src="https://geo.dailymotion.com/player.html?video=k62haWxly8w0aIyheWY"
          title="Digital & Sustainability"
          className="w-full aspect-video rounded-2xl"
          allowFullScreen
        />
      </div>

      {/* Theme 2 */}
      <h3 className="text-lg font-semibold mt-8">
        Thème 2 — Régénération environnementale
      </h3>
      <p className="mb-3 text-muted-foreground">
        Comment les modèles opérationnels du luxe peuvent-ils contribuer à
        régénérer la biodiversité et passer d’une logique extractive à une
        logique de création de valeur ?
      </p>
      <iframe
        src="https://geo.dailymotion.com/player.html?video=k48Fs2fg2YQLF1yhdWK"
        title="Regeneration & Biodiversity"
        className="w-full aspect-video rounded-xl border border-border/60"
        allowFullScreen
      />

      {/* Theme 3 */}
      <h3 className="text-lg font-semibold mt-8">
        Thème 3 — Le produit luxe de demain
      </h3>
      <p className="mb-3 text-muted-foreground">
        Quelles nouvelles expériences et propositions de valeur pour le luxe ?
        Quels modèles hybrides (digital/physique) et quels nouveaux entrants ?
      </p>
      <iframe
        src="https://geo.dailymotion.com/player.html?video=k3xeO2gdiKS7GQyhdWI"
        title="Future Luxury Product"
        className="w-full aspect-video rounded-xl border border-border/60"
        allowFullScreen
      />

      {/* Theme 4 */}
      <h3 className="text-lg font-semibold mt-8">
        Thème 4 — Le savoir-faire du futur
      </h3>
      <p className="mb-3 text-muted-foreground">
        Quelles compétences et savoir-faire demain pour le luxe ? Quels
        partenariats croisés de la conception à l’expérience produit ?
      </p>
      <iframe
        src="https://geo.dailymotion.com/player.html?video=k1x0nA04TjMqaoyhdWJ"
        title="Luxury Know-how of Tomorrow"
        className="w-full aspect-video rounded-xl border border-border/60"
        allowFullScreen
      />

      <Divider />

      <SectionTitle>Final words</SectionTitle>
      <Quote>
        « Et si l’artisan du futur devenait un bio-hacker capable de détourner
        des matériaux alternatifs pour créer des objets d’exception ? Et si le
        luxe s’incarnait dans l’usage plutôt que la possession, transmis sous
        forme d’abonnements ou de jetons numériques ? » —{" "}
        <strong>Martin Lauquin, Onepoint</strong>
      </Quote>

      <Divider />

      <SectionTitle>Pour aller plus loin</SectionTitle>
      <ul className="list-disc ml-5 space-y-1">
        <Bullet>
          <a
            href="https://journalduluxe.fr/fr/business/montgolfier-bain-tendances-luxe-2021-2022"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[#0c3d5e]"
          >
            Journal du Luxe – Bain Tendance Luxe 2021-2022
          </a>
        </Bullet>
        <Bullet>
          <a
            href="https://www.bain.com/fr/a-propos-de-bain/media-center/communiques-de-presse/france/2021/Le-secteur-du-luxe-rebondit-des-2021-pret-a-renouer-avec-ses-niveaux-de-croissance-historique/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[#0c3d5e]"
          >
            Bain & Company – Le secteur du luxe rebondit dès 2021
          </a>
        </Bullet>
      </ul>
    </>
  );

    case "sustainable-cities":
  return (
    <>
      {/* Chapeau */}
      <Lead>
        Au-delà du buzzword <em>smart city</em>, l’enjeu est de concevoir des
        villes <strong>vraiment durables</strong> — où gouvernance, data et
        modèles économiques s’alignent pour livrer des impacts mesurables à
        l’échelle du bâtiment, du quartier et de la ville.
      </Lead>

      <Divider />

      {/* Badge contexte */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-[#0c3d5e]/10 px-3 py-1 text-xs font-medium text-[#0c3d5e]">
          Activate • Insight
        </span>
        <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
          Juillet 8, 2021
        </span>
      </div>

      {/* KPIs */}
      <KPIGrid
        items={[
          { label: "Équipes", value: "5 (6 étudiants chacune)" },
          { label: "Écoles", value: "ESCP • École Polytechnique" },
          { label: "Cadre", value: "Open Innovation (onepoint)" },
          { label: "Axes", value: "0-carbone • 0-déchet • Sobriété" },
          { label: "Cours ESCP", value: "Consulting Dynamics & Practices" },
          { label: "Cours X", value: "Sustainable Strategy & Business Models" },
        ]}
      />

      {/* About the paper */}
      <SectionTitle icon={<Leaf className="h-5 w-5 text-[#0c3d5e]" />}>
        À propos du challenge
      </SectionTitle>
      <div className="rounded-2xl border border-border/60 bg-card p-5">
        <ul className="list-disc ml-5 space-y-2 text-foreground/80">
          <Bullet>
            <strong>15</strong> étudiants ESCP (coord. Pr. Daniel Rouach) coachés par
            <strong> Stéphane Lesage</strong>.
          </Bullet>
          <Bullet>
            <strong>15</strong> étudiants de l’École Polytechnique (coord. Dr. Benjamin
            Lehiany & Dr. Cécile Chamaret).
          </Bullet>
          <Bullet>
            <strong>Mélangés en 5 équipes</strong> de 6 étudiants — focus sur{" "}
            technologie & business model.
          </Bullet>
          <Bullet>
            <strong>Coaching onepoint</strong> : Jean-Pierre Poinsignon & Olivier
            Témam pour cadrage et pertinence.
          </Bullet>
        </ul>
      </div>

      {/* Thématiques & quick wins */}
      <SectionTitle>Trois pistes concrètes</SectionTitle>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border/60 bg-card p-4">
          <div className="text-sm font-semibold text-[#0c3d5e] mb-1">0-Carbone</div>
          <ul className="list-disc ml-5 space-y-1 text-sm">
            <Bullet>Rénovation énergétique + PPA locaux</Bullet>
            <Bullet>Flexibilité & agrégation de charges</Bullet>
            <Bullet>Data temps réel : pilotage des usages</Bullet>
          </ul>
        </div>
        <div className="rounded-xl border border-border/60 bg-card p-4">
          <div className="text-sm font-semibold text-[#0c3d5e] mb-1">0-Déchet</div>
          <ul className="list-disc ml-5 space-y-1 text-sm">
            <Bullet>Réemploi matériaux & filières locales</Bullet>
            <Bullet>Compostage & bio-déchets en boucle courte</Bullet>
            <Bullet>Approvisionnement bas-carbone</Bullet>
          </ul>
        </div>
        <div className="rounded-xl border border-border/60 bg-card p-4">
          <div className="text-sm font-semibold text-[#0c3d5e] mb-1">Sobriété</div>
          <ul className="list-disc ml-5 space-y-1 text-sm">
            <Bullet>Tarification incitative & nudge design</Bullet>
            <Bullet>Partage d’espaces & d’équipements</Bullet>
            <Bullet>Mobilité douce & intermodalité</Bullet>
          </ul>
        </div>
      </div>

      {/* Governance / Data / Strategy */}
      <SectionTitle icon={<Target className="h-5 w-5 text-[#0c3d5e]" />}>
        Gouvernance • Data • Stratégie
      </SectionTitle>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <div className="text-sm uppercase tracking-wide text-muted-foreground">
            Gouvernance
          </div>
          <p className="mt-1 text-sm leading-relaxed">
            Éviter les silos : comité de pilotage multi-acteurs, mandat clair,
            règles de décision, mécanismes d’incitation et de partage de valeur
            à l’échelle du quartier.
          </p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <div className="text-sm uppercase tracking-wide text-muted-foreground">
            Data Management
          </div>
          <p className="mt-1 text-sm leading-relaxed">
            Collecte, qualité et interopérabilité des données (énergie, mobilité,
            déchets) + standards d’échange + souveraineté & privacy dès la
            conception.
          </p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <div className="text-sm uppercase tracking-wide text-muted-foreground">
            Stratégie
          </div>
          <p className="mt-1 text-sm leading-relaxed">
            Portefeuille d’initiatives priorisé sur{" "}
            ROI(€)/CO₂/usage. Piloter par jalons : POC → pilote → scale-up,
            avec modèles économiques hybrides public/privé.
          </p>
        </div>
      </div>

      {/* Ce que les projets montrent */}
      <SectionTitle>Ce que les projets montrent</SectionTitle>
      <ul className="list-disc ml-5 space-y-2">
        <Bullet>
          <strong>Quick-wins locaux</strong> (bâtiment/îlot) → impacts rapides et
          mesurables avant passage à l’échelle.
        </Bullet>
        <Bullet>
          <strong>La gouvernance fait la vitesse</strong> : elle peut accélérer…
          ou freiner toute la trajectoire d’un programme.
        </Bullet>
        <Bullet>
          <strong>Arbitrages assumés</strong> entre tech, usages et modèle
          économique — pas de solution « magique ».
        </Bullet>
      </ul>

      {/* Callout final */}
      <Callout title="Levier majeur de transition">
        Croiser ingénierie & management pour des solutions{" "}
        <em>systémiques</em>, pas seulement technologiques. <br />
        <span className="text-[#0c3d5e] font-semibold">
          Objectif : un mix d’initiatives 0-carbone / 0-déchet / sobriété{" "}
          orchestré au niveau urbain, avec données actionnables et
          gouvernance claire.
        </span>
      </Callout>

      {/* Tags */}
      <div className="mt-6 flex flex-wrap gap-2">
        {["Sustainable Cities", "Zero Carbon", "Zero Waste", "Sobriété", "Open Innovation"].map(
          (tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/60 bg-muted px-3 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          )
        )}
      </div>
    </>
  );

    case "operational-efficiency-em":
  return (
    <>
      {/* Chapeau */}
      <Lead>
        Discover all our course materials used by the Manadvisors to deliver the
        seminar <strong>“Operational Efficiency”</strong> as part of the Excellence
        Track at EM Normandie. A hands-on program designed to simulate
        real-life situations and prepare junior managers/consultants for the day-to-day.
      </Lead>

      <Divider />

      {/* Contexte éditorial */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
          Juin 17, 2021
        </span>
        <span className="inline-flex items-center rounded-full bg-[#0c3d5e]/10 px-3 py-1 text-xs font-medium text-[#0c3d5e]">
          Insight
        </span>
        <span className="inline-flex items-center rounded-full bg-manadvise/10 px-3 py-1 text-xs font-medium text-manadvise">
          Learn
        </span>
      </div>

      {/* KPIs synthétiques */}
      <KPIGrid
        items={[
          { label: "Format", value: "Summer School • Excellence Track" },
          { label: "Objectif", value: "Préparer les junior managers" },
          { label: "Approche", value: "Hands-on • Cas • Simulations" },
          { label: "Piliers", value: "Lean • Toolbox • Exécution" },
          { label: "Établissement", value: "EM Normandie" },
          { label: "Durée", value: "Intensif (session d’été)" },
        ]}
      />

      {/* À propos */}
      <SectionTitle icon={<GraduationCap className="h-5 w-5 text-[#0c3d5e]" />}>
        À propos du séminaire
      </SectionTitle>
      <p className="leading-relaxed text-foreground/80">
        Le séminaire “Operational Efficiency” vise à outiller les étudiants sur
        les fondamentaux d’<em>operational excellence</em> et à les confronter à
        des situations réelles. Il couvre les origines de l’excellence
        opérationnelle, les principes du <strong>Lean management</strong>, la
        boîte à outils d’efficacité opérationnelle et des mises en application
        concrètes (études de cas, jeux de rôle, restitutions).
      </p>

      {/* Programme */}
      <SectionTitle icon={<Zap className="h-5 w-5 text-[#0c3d5e]" />}>
        Programme & contenus clés
      </SectionTitle>
      <ul className="list-disc ml-5 space-y-2">
        <Bullet>
          <strong>Origines & principes</strong> : Toyota Way, flux tirés, qualité à la
          source, amélioration continue.
        </Bullet>
        <Bullet>
          <strong>Lean management</strong> : valeur vs. gaspillage, VSM, 5S, Kaizen,
          standard work, A3 problem solving.
        </Bullet>
        <Bullet>
          <strong>Toolbox opérationnelle</strong> : priorisation, planification,
          pilotage visuel, rituels de synchronisation.
        </Bullet>
        <Bullet>
          <strong>Cas & simulations</strong> : qualification du besoin, cadrage,
          exécution, mesure d’impact, restitution.
        </Bullet>
      </ul>

      {/* Compétences */}
      <SectionTitle icon={<Target className="h-5 w-5 text-[#0c3d5e]" />}>
        Compétences développées
      </SectionTitle>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border/60 bg-card p-4">
          <div className="text-sm font-semibold text-[#0c3d5e] mb-1">Diagnostic</div>
          <p className="text-sm text-foreground/80">
            Cartographier un processus, identifier goulots et gaspillages, cadrer un
            plan d’amélioration pragmatique.
          </p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card p-4">
          <div className="text-sm font-semibold text-[#0c3d5e] mb-1">Exécution</div>
          <p className="text-sm text-foreground/80">
            Mettre en œuvre des rituels Lean, piloter par indicateurs, tenir les
            engagements qualité-délai.
          </p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card p-4">
          <div className="text-sm font-semibold text-[#0c3d5e] mb-1">Posture</div>
          <p className="text-sm text-foreground/80">
            Travailler en équipe, communiquer efficacement, restituer de façon claire
            et orientée décision.
          </p>
        </div>
      </div>

      {/* Ressource externe (Slideshare) */}
      <SectionTitle>Ressources du cours</SectionTitle>
      <div className="rounded-2xl border border-[#0c3d5e]/20 bg-gradient-to-br from-white to-muted/40 p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-[#0c3d5e]">
              Supports “Operational Efficiency”
            </div>
            <p className="text-sm text-foreground/80">
              Accédez au jeu de slides utilisé pendant la Summer School (aperçu Slideshare).
            </p>
          </div>
          <a
            href="https://fr.slideshare.net/slideshow/em-normandie-operational-efficiency-249365121/249365121"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-[#0c3d5e] px-4 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#0a2f4a] hover:shadow-md"
          >
            Ouvrir sur Slideshare
          </a>
        </div>
      </div>

      {/* Impact */}
      <SectionTitle>Impact</SectionTitle>
      <Callout title="Ce que les étudiants retiennent">
        Une compréhension <strong>actionnable</strong> des méthodes et postures
        attendues dès la prise de poste : passer du concept à l’exécution, avec
        des outils simples, mesurables et réplicables.
      </Callout>
    </>
  );
    case "managuide-innovation":
  return (
    <>
      <Lead>
        Au-delà du mythe de l’idée de génie, le succès d’une innovation repose
        avant tout sur la qualité de son exécution — de l’idéation jusqu’à la
        mise sur le marché et aux retours utilisateurs. Pour accompagner les
        innovateurs, les équipes de <strong>Manadvise</strong> ont décortiqué
        les méthodes et outils d’innovation les plus reconnus et les ont réunis
        dans un guide accessible et actionnable.
      </Lead>

      <Divider />

      <SectionTitle>Pourquoi un guide de l’innovation ?</SectionTitle>
      <p className="leading-relaxed">
        Le rôle clé de l’innovation dans le développement des organisations et
        de la société ne fait plus débat. Ce qui interroge, c’est le{" "}
        <em>« comment »</em>. Et comme le management n’est pas une science
        exacte, les réponses sont multiples — chacune met en lumière une
        dimension particulière :
      </p>
      <ul className="ml-5 mt-4 list-disc space-y-2">
        <Bullet>
          <strong>Nature</strong> : produit, service, procédé, business model
        </Bullet>
        <Bullet>
          <strong>Sources</strong> : internes (fermée) ou externes (ouverte)
        </Bullet>
        <Bullet>
          <strong>Moteur</strong> : besoins clients (market-pull) ou R&amp;D
          (techno-push)
        </Bullet>
        <Bullet>
          <strong>Type</strong> : incrémentale ou radicale
        </Bullet>
        <Bullet>
          <strong>Dynamique</strong> : continue ou disruptive
        </Bullet>
        <Bullet>
          <strong>Impact</strong> : économique, écologique, sociétal, systémique
        </Bullet>
      </ul>

      <Divider />

      <SectionTitle>Objectif du guide</SectionTitle>
      <Callout title="Une synthèse éprouvée">
        Ce guide fournit une vue d’ensemble structurée des manières
        d’innover qui ont résisté à l’épreuve des faits, loin des modes
        managériales. Il met en avant les méthodes les plus reconnues et
        éprouvées, celles qui apportent des réponses <em>concrètes</em> à la
        question du « comment innover ? ».
      </Callout>

      <Divider />

      <SectionTitle>À propos de ce guide</SectionTitle>
      <p className="leading-relaxed">
        Nous avons sélectionné <strong>12 méthodes essentielles</strong> pour
        aider les innovateurs à trouver des solutions aux défis auxquels les
        entreprises font face. Chacune est décrite de façon claire et
        directement applicable, quels que soient le secteur et la taille de
        l’organisation.
      </p>
      <KPIGrid
        items={[
          { label: "Méthodes incluses", value: "12" },
          { label: "Applicabilité", value: "Tous secteurs" },
          { label: "Focus", value: "Idée → Impact" },
        ]}
      />

      <Divider />

      <SectionTitle>En résumé</SectionTitle>
      <Callout title="Let’s innovate 🚀">
        Des fiches claires, prêtes à l’emploi, pour{" "}
        <strong>cadrer, prioriser, tester, mesurer et apprendre plus vite</strong>.
        Un raccourci vers l’action pour transformer vos idées en résultats
        tangibles.
      </Callout>
    </>
  );

    case "autoconsommation-collective":
  return (
    <>
      {/* Chapeau */}
      <Lead>
        <strong>Autoconsommation collective (ACC)</strong> : quel mode de
        gouvernance permet de faire converger des intérêts parfois divergents
        et d’accélérer un modèle local, sobre et efficace&nbsp;? En analysant
        <strong> 5 écoquartiers</strong>, Charbel Hobeika et Quentin Labrue
        (École Polytechnique) apportent des réponses concrètes.
      </Lead>

      <Divider />

      {/* KPIs rapides */}
      <KPIGrid
        items={[
          { label: "Temps de lecture", value: "7 minutes" },
          { label: "Catégorie", value: "Énergie" },
          { label: "Tags", value: "Gouvernance • Chaîne de valeur • Décentralisation" },
        ]}
      />

      {/* Contexte marché */}
      <SectionTitle>Pourquoi l’ACC maintenant&nbsp;?</SectionTitle>
      <p className="leading-relaxed">
        Alors que l’<em>autoconsommation individuelle</em> a dépassé les
        <strong> 100&nbsp;000</strong> utilisateurs raccordés en 2021 en
        France, l’<em>ACC</em> progresse plus discrètement&nbsp;: de{" "}
        <strong>6 projets / 44 participants (2018)</strong> à{" "}
        <strong>68 projets actifs / +800 participants (fin 2021)</strong>.
        Promesse&nbsp;: une énergie verte, <em>produite et partagée localement</em>.
        Réalité&nbsp;: des obstacles techniques, économiques et surtout de{" "}
        <strong>gouvernance</strong> d’un réseau <em>décentralisé</em>.
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/60">
        <img
          src="/1-auto.png"
          alt="Dynamiques de l'autoconsommation et enjeux"
          className="w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Définition & consom'acteurs */}
      <SectionTitle>Autoconsommation & consom’acteurs, de quoi parle-t-on&nbsp;?</SectionTitle>
      <p className="leading-relaxed">
        L’autoconsommation, c’est consommer sa propre production (souvent
        photovoltaïque). On distingue&nbsp;:
      </p>
      <ul className="list-disc ml-5 space-y-2">
        <Bullet>
          <strong>Individuelle</strong> — un même site produit et consomme sa
          propre électricité.
        </Bullet>
        <Bullet>
          <strong>Collective</strong> — plusieurs producteurs et consommateurs
          s’échangent localement de l’énergie.
        </Bullet>
      </ul>
      <p className="mt-2 leading-relaxed">
        Dans les deux cas, le <em>raccordement au réseau central</em> reste
        indispensable (surplus de production/consommation, intermittence).
        Les <strong>consom’acteurs</strong> deviennent à la fois producteurs,
        revendeurs et consommateurs, avec un triple objectif&nbsp;: économies,
        décarbonation et <em>empowerment</em>.
      </p>

      {/* Chaîne de valeur */}
      <SectionTitle>Une chaîne de valeur multi-acteurs</SectionTitle>
      <p className="leading-relaxed">
        L’ACC fragmente la chaîne de valeur entre consommateurs/fournisseurs,
        producteurs ENR et responsables d’équilibre,{" "}
        <strong>PMO</strong> (personne morale organisatrice), services tiers,
        GRD, et régulateur national. La coordination est déterminante.
      </p>
      <div className="my-6 overflow-hidden rounded-2xl border border-border/60">
        <img
          src="/2-auto.png"
          alt="Chaîne de valeur multi-acteurs de l'ACC"
          className="w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Étude & gouvernance */}
      <SectionTitle>Quel mode de gouvernance de l’ACC&nbsp;?</SectionTitle>
      <p className="leading-relaxed">
        L’étude compare <strong>5 projets d’ACC</strong> (écoquartiers) et
        met en regard la littérature sur la gouvernance des réseaux pour
        faire émerger <strong>4 formes</strong> de gouvernance, avec leurs
        avantages/inconvénients.
      </p>
      <div className="my-6 overflow-hidden rounded-2xl border border-border/60">
        <img
          src="/3-auto.png"
          alt="Échantillon des projets d'ACC analysés"
          className="w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="my-6 overflow-hidden rounded-2xl border border-border/60">
        <img
          src="/4-auto.png"
          alt="Quatre modes de gouvernance de l'ACC"
          className="w-full object-cover"
          loading="lazy"
        />
      </div>
      <Callout title="À retenir (gouvernance)">
        <ul className="list-disc ml-5 space-y-1">
          <Bullet>
            <strong>Pas de modèle magique</strong>&nbsp;: l’efficacité dépend
            du <em>mix technique/économique</em> et de la{" "}
            <em>composition des participants</em>.
          </Bullet>
          <Bullet>
            <strong>Hétérogénéité & faible confiance</strong>&nbsp;: éviter une
            gouvernance trop partagée&nbsp;; privilégier un pilote clair (centralisé
            ou gestionnaire indépendant).
          </Bullet>
          <Bullet>
            <strong>Homogénéité</strong>&nbsp;: la centralisation peut simplifier
            les décisions et réduire les coûts de coordination.
          </Bullet>
        </ul>
      </Callout>

      {/* Freins */}
      <SectionTitle>Pourquoi n’en voit-on pas davantage&nbsp;?</SectionTitle>
      <ul className="list-disc ml-5 space-y-2">
        <Bullet>
          <strong>Compétitivité</strong> de l’électricité autoproduite faible
          vs. électricité classique subventionnée (+ poids du nucléaire).
        </Bullet>
        <Bullet>
          <strong>TURPE</strong> (tarif réseau – CRE) qui plombe la rentabilité
          sans subventions adaptées.
        </Bullet>
        <Bullet>
          <strong>Procédures</strong> longues/complexes (raccordement, autorisations).
        </Bullet>
        <Bullet>
          <strong>Peu d’expérimentations</strong> (cadre prudent du régulateur).
        </Bullet>
        <Bullet>
          <strong>Stockage</strong> encore coûteux/limité, rendant difficile
          l’alignement production/consommation.
        </Bullet>
        <Bullet>
          <strong>Comportements</strong> des consom’acteurs (lissage des usages,
          sobriété) à accompagner.
        </Bullet>
        <Bullet>
          <strong>Ambivalences sectorielles</strong> (acteurs historiques
          défendant le modèle national).
        </Bullet>
      </ul>

      {/* Régulation */}
      <SectionTitle>La régulation comme levier</SectionTitle>
      <p className="leading-relaxed">
        Malgré un échantillon limité, l’étude montre des progrès nets en 10 ans.
        La viabilité dépendra d’un <strong>triptyque</strong>&nbsp;:
        <em>collectivités</em> engagées, <em>technologies</em> (stockage, smart grids),
        et <em>régulation</em> incitative (réexaminer péréquation et timbre-poste
        pour encourager l’ACC). À ne pas oublier&nbsp;: la{" "}
        <strong>fin de vie des actifs</strong> (panneaux) pour rester vraiment
        vert et durable.
      </p>

      {/* Conclusion courte */}
      <SectionTitle>Conclusion</SectionTitle>
      <Quote>
        Le bon mode dépend de la <em>composition</em> du projet, du{" "}
        <em>niveau de confiance</em> et du contexte techno-économique. La
        régulation et l’orchestration restent les accélérateurs clés.
      </Quote>

      {/* Auteur */}
      <SectionTitle>À propos de l’auteure</SectionTitle>
      <p className="leading-relaxed">
        <strong>Farah Doumit</strong> est doctorante au Centre de Recherche en
        Gestion (École Polytechnique). Elle travaille sur les{" "}
        <em>business models</em> de l’économie circulaire dans les secteurs
        des déchets, de l’eau et de l’énergie.
      </p>

      {/* Sources & liens utiles */}
      <SectionTitle>Sources & ressources</SectionTitle>
      <ul className="list-disc ml-5 space-y-2">
        <Bullet>
          Données Enedis (2021)&nbsp;:{" "}
          <a
            href="https://data.enedis.fr/explore/embed/dataset/autoconsommation-collective-maille-enedis/table/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[#0c3d5e]"
          >
            tableau ACC (embed)
          </a>
        </Bullet>
        <Bullet>
          Lehiany, B. (2012), «&nbsp;Gouvernance opérationnelle d’un Méta réseau&nbsp;»
          (working paper).
        </Bullet>
        <Bullet>
          Gigout, Mayer, Dumez (2021),{" "}
          <em>
            Les «&nbsp;niches&nbsp;» de transition comme espace de renégociation du
            système énergétique
          </em>{" "}
          — Annales des Mines – Gérer et comprendre, 145(3).
        </Bullet>
        <Bullet>
          Provan &amp; Kenis (2007),{" "}
          <em>Modes of Network Governance: Structure, Management, and Effectiveness</em>,
          JPART 18(2).
        </Bullet>
      </ul>
    </>
  );

    case "value-wheel-tool":
  return (
    <>
      {/* Intro */}
      <Lead>
        Au-delà des seuls indicateurs financiers, le{" "}
        <strong>Value Wheel</strong> est un cadre stratégique qui mesure la
        création de valeur pour l’entreprise, la société, le climat et les
        parties prenantes. Co-développé avec <em>Fabernovel</em>, il a été testé
        par cinq étudiants de l’<em>École Polytechnique</em> sur des cas réels
        d’entreprises.
      </Lead>

      <Divider />

      {/* Contexte */}
      <SectionTitle>Pourquoi le Value Wheel&nbsp;?</SectionTitle>
      <p className="leading-relaxed">
        L’innovation managériale ne réside pas seulement dans le «&nbsp;quoi&nbsp;»,
        mais surtout dans le <em>comment mesurer</em> et <em>piloter</em> la
        valeur créée. Le Value Wheel intègre à la fois les{" "}
        <strong>stakeholders</strong> (ex.: planète, société, talents),
        les <strong>objectifs</strong> (financiers, environnementaux, sociaux)
        et des <strong>KPI/KVI</strong> associés. Objectif&nbsp;: guider la
        décision stratégique en équilibrant performance économique et impact.
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/60">
        <img
          src="/1-value.png"
          alt="Schéma du Value Wheel"
          className="w-full object-contain"
          loading="lazy"
        />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Interested in the Value Wheel?{" "}
        <a
          href="https://www.fabernovel.com/contenu/la-value-wheel-ou-pourquoi-la-creation-de-valeur-est-indissociable-du-partage-de-celle-ci-avec-lensemble-de-ses-parties-prenantes"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-[#0c3d5e]"
        >
          Read more about it here
        </a>
        .
      </p>

      {/* Projet étudiant */}
      <SectionTitle>Expérimentation académique</SectionTitle>
      <p className="leading-relaxed">
        Cinq étudiants de l’X ont appliqué le modèle à{" "}
        <strong>Danone, Kering, Michelin, Patagonia et Schneider Electric</strong>.
        Leur démarche&nbsp;: <em>définir</em> (collecter données publiques),
        <em>jouer</em> (appliquer le Wheel à des business cases),
        <em>conclure</em> (partager leurs observations). Résultat&nbsp;:
        chaque entreprise génère des profils de valeur très différents selon
        ses activités et ses parties prenantes.
      </p>
      <Quote>
        “Working with Fabernovel was amazing! Claudia del Prado and Elisa
        Rimbano were lovely and very helpful with their constructive feedback,
        they were very understanding. It was a very valuable exercise and will
        be useful for me in the future!” — Thomas Maaza, étudiant à
        l’École Polytechnique
      </Quote>

      {/* Cas Schneider */}
      <SectionTitle>Cas Schneider Electric</SectionTitle>
      <p className="leading-relaxed">
        Schneider Electric illustre parfaitement l’usage du Value Wheel. Son
        modèle CSCS (<strong>Company • Society • Climate • Stakeholders</strong>)
        montre comment un leader mondial de la gestion énergétique intègre
        durabilité et performance :
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/60">
        <img
          src="/2-value.png"
          alt="Value Wheel Schneider Electric"
          className="w-full object-contain"
          loading="lazy"
        />
      </div>

      <ul className="list-disc ml-5 space-y-2">
        <Bullet>
          <strong>Énergie</strong> : management (≈75% du CA, valeur
          principalement économique).
        </Bullet>
        <Bullet>
          <strong>Automatisation</strong> : forte contribution au climat
          (impact ENR).
        </Bullet>
        <Bullet>
          <strong>Logiciels & services</strong> : valeur digitale + supply
          chain optimisée.
        </Bullet>
      </ul>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/60">
        <img
          src="/3-value.png"
          alt="Répartition de la valeur Schneider Electric"
          className="w-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Insights finaux */}
      <SectionTitle>Key Takeaways</SectionTitle>
      <ul className="list-disc ml-5 space-y-2">
        <Bullet>
          <strong>Lack of transparency</strong> — accès limité aux KPI non
          financiers.
        </Bullet>
        <Bullet>
          <strong>No one-size-fits-all</strong> — chaque entreprise a son
          propre Value Wheel.
        </Bullet>
        <Bullet>
          <strong>Deep change is complex</strong> — intégrer la valeur
          multi-parties prenantes implique de repenser stratégie et modèle
          opérationnel.
        </Bullet>
        <Bullet>
          <strong>Measurement challenges</strong> — difficulté
          d’harmonisation des métriques et références.
        </Bullet>
      </ul>

      <Callout title="En bref">
        Le Value Wheel est un outil puissant de projection et d’évaluation
        stratégique. Il ne supprime pas la complexité de la mesure mais
        permet de <strong>structurer le dialogue</strong> et d’orienter les
        arbitrages stratégiques.
      </Callout>
    </>
  );

    case "consultant-behaviour-escp":
  return (
    <>
      <Lead>
        Découvrez les supports de cours utilisés par les <strong>Manadvisors</strong> pour animer
        la classe <em>“Consultant Behaviour”</em> à l’ESCP Business School. Le module donne une
        vision <strong>pratique et transversale</strong> du conseil : marché, recrutement, cycle de
        mission, proposition commerciale, posture & éthique.
      </Lead>

      <Divider />

      {/* PDF indisponible — badge discret */}
      <div className="mb-6 rounded-xl border border-dashed border-border/60 bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
        PDF non disponible pour cet article — consultez les supports ci-dessous sur SlideShare.
      </div>

      <SectionTitle>Contexte</SectionTitle>
      <p className="leading-relaxed">
        Proposé aux étudiants du <em>Master in Management</em> (spécialisation “Consulting dynamics
        and practices”), ce cours vise une compréhension fine du métier et des attendus
        professionnels dès la prise de poste.
      </p>

      <SectionTitle>Plan du cours</SectionTitle>
      <ul className="ml-5 list-disc space-y-2">
        <Bullet>Introduction au métier, acteurs et sujets “hot”</Bullet>
        <Bullet>Processus de recrutement & trajectoires de carrière</Bullet>
        <Bullet>Cycle de mission & boîte à outils du consultant</Bullet>
        <Bullet>Propositions commerciales : MBB vs hybrides</Bullet>
        <Bullet>Posture, éthique & gestion du temps</Bullet>
      </ul>

      <Divider />

      <SectionTitle>Supports de cours</SectionTitle>
      {/* Cartes “ouvrir sur SlideShare” — remplace les iframes bloquées */}
      <div className="grid gap-5 md:grid-cols-2">
        {[
          {
            id: 1,
            title: "Session 1 — Industry, actors & hot topics",
            desc:
              "Définition du métier, typologies de cabinets, tendances du secteur.",
            href:
              "https://fr.slideshare.net/slideshow/escp-consultant-behaviour-session-1-2021-the-consulting-industry-actors-and-hot-topics-249146233/249146233",
          },
          {
            id: 2,
            title: "Session 2 — Recruiting & careers",
            desc:
              "Process de recrutement, parcours, raisons de rejoindre… ou pas.",
            href:
              "https://fr.slideshare.net/slideshow/escp-consultant-behaviour-session-2-2021-consultant-jobs-and-career-249146234/249146234",
          },
          {
            id: 3,
            title: "Session 3 — Mission lifecycle & toolbox",
            desc:
              "Qualifier le besoin client, phases d’une mission, outils clés.",
            href:
              "https://fr.slideshare.net/slideshow/escp-consultant-behaviour-session-3-2021-mission-lifecycle-consultant-toolbox-249146236/249146236",
          },
          {
            id: 4,
            title: "Session 4 — Commercial proposal",
            desc:
              "Comparer une propale MBB vs cabinet hybride : structure & attentes.",
            href:
              "https://fr.slideshare.net/slideshow/escp-consultant-behaviour-session-4-2021-commercial-proposal-249146238/249146238",
          },
          {
            id: 5,
            title: "Session 5 — Posture, ethics & time management",
            desc:
              "Posture selon le type de cabinet, éthique, tips de gestion du temps.",
            href:
              "https://fr.slideshare.net/slideshow/escp-consultant-behaviour-session-5-2021-consultant-posture-ethics-time-management-249146241/249146241",
          },
        ].map((s) => (
          <div
            key={s.id}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 p-5 shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:shadow-xl"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-manadvise/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <div className="relative z-10">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0c3d5e]">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-manadvise to-manadvise-dark text-white shadow">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d="M4 4h16v2H4zM4 10h16v2H4zM4 16h10v2H4z" />
                  </svg>
                </span>
                Slide {s.id}
              </div>
              <div className="mb-2 text-lg font-semibold text-[#0c3d5e]">
                {s.title}
              </div>
              <p className="mb-4 text-sm text-foreground/80">{s.desc}</p>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-[#0c3d5e]/30 bg-white/60 px-4 py-2 text-sm font-medium text-[#0c3d5e] backdrop-blur transition-all hover:border-[#0c3d5e] hover:bg-white"
              >
                Ouvrir sur SlideShare
                <svg
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      <SectionTitle>Témoignage étudiant</SectionTitle>
      <Quote>
        “I would again like to thank both of you for all the efforts you put into making
        the classes engaging and interactive despite it being online, it was really
        helpful for this course. I thoroughly enjoyed this course and got to learn a
        lot of new things.” — Sumit, ESCP
      </Quote>
    </>
  );

    case "spring-2021-success":
  return (
    <>
      <Lead>
        Une saison de <strong>co-innovation</strong> menée tambour battant :
        challenges inter-écoles, projets concrets, itérations rapides et
        retours d’expérience actionnables. Cap sur l’impact — sans perdre
        l’exigence pédagogique.
      </Lead>

      <Divider />

      {/* KPIs — ligne 1 */}
      <KPIGrid
        items={[
          { label: "Écoles", value: "5" },
          { label: "Étudiants", value: "100+" },
          { label: "Partenaires", value: "10" },
        ]}
      />

      {/* KPIs — ligne 2 */}
      <div className="mt-4">
        <KPIGrid
          items={[
            { label: "Heures de coaching & cours", value: "150+" },
            { label: "Satisfaction", value: "89%" },
            { label: "Projets", value: "14" },
          ]}
        />
      </div>

      {/* Visuels */}
      <SectionTitle>En images</SectionTitle>
      <div className="grid gap-4 md:grid-cols-2">
        <figure className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={publicUrl("1-2021.png")}
              alt="Saison Spring 2021 — résultats & chiffres clés"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
          <figcaption className="px-4 py-3 text-sm text-muted-foreground">
            <span className="font-medium text-[#0c3d5e]">Chiffres marquants.</span>{" "}
            5 écoles, 100+ étudiants, 10 partenaires, 150+ heures, 89% de
            satisfaction, 14 projets.
          </figcaption>
        </figure>

        <figure className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={publicUrl("2-2021.png")}
              alt="Projets réalisés avec des acteurs qui innovent"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
          <figcaption className="px-4 py-3 text-sm text-muted-foreground">
            <span className="font-medium text-[#0c3d5e]">Projets & partenaires.</span>{" "}
            De la start-up aux grands groupes, des sujets “terrain” avec livrables
            concrets.
          </figcaption>
        </figure>
      </div>

      {/* Corps */}
      <SectionTitle>Ce que nous avons appris</SectionTitle>
      <ul className="ml-5 list-disc space-y-2">
        <Bullet>
          <strong>Rythme & cadrage</strong> : un double tempo (sprints courts +
          jalons pédagogiques) maximise l’engagement.
        </Bullet>
        <Bullet>
          <strong>Hybridation</strong> : présentiel + distanciel bien orchestrés =
          plus de disponibilité coachs/experts, moins de friction.
        </Bullet>
        <Bullet>
          <strong>Co-conception</strong> avec les partenaires : des briefs plus
          nets → des livrables plus actionnables.
        </Bullet>
      </ul>

      <SectionTitle>Focus Smart Cities (Onepoint)</SectionTitle>
      <ul className="ml-5 list-disc space-y-2">
        <Bullet>Défis “zéro carbone” à l’échelle quartier/ville.</Bullet>
        <Bullet>Prototypage d’outils d’aide à la décision data-driven.</Bullet>
        <Bullet>Évaluation d’impact environnemental & sociétal.</Bullet>
      </ul>

      <Divider />

      <Callout title="Et maintenant ?">
        Poursuite en <strong>Fall 2021</strong> avec un périmètre élargi
        (mobilité, régénération urbaine, économie circulaire) et un accent
        renforcé sur les <em>proofs-of-concept</em> industrialisables.
      </Callout>
    </>
  );

    case "archetypes-entreprises-innovantes":
  return (
    <>
      {/* Chapeau + méta */}
      <Lead>
        En matière d’innovativité des entreprises, il n’y a pas qu’une seule voie.
        Au-delà du mythe de la startup « forcément » plus agile, plusieurs
        configurations organisationnelles mènent à la performance d’innovation.
        Cette synthèse met en lumière <strong>six archétypes</strong> identifiés
        via une analyse fsQCA des 60 entreprises les plus innovantes du classement
        Forbes (2018).
      </Lead>

      <div className="mt-4 mb-2 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
          Mai 26, 2021
        </span>
        <span className="inline-flex items-center rounded-full bg-manamind/10 px-3 py-1 text-xs font-medium text-manamind">
          Catégorie : Innovation
        </span>
        <span className="inline-flex items-center rounded-full bg-[#0c3d5e]/10 px-3 py-1 text-xs font-medium text-[#0c3d5e]">
          Temps de lecture : ~5 min
        </span>
      </div>

      <Divider />

      {/* Triptyque : Problème / Démarche / Solution */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border/60 bg-card p-4">
          <div className="text-sm font-semibold text-[#0c3d5e] mb-1">Problème</div>
          <p className="text-sm text-foreground/80">
            Trop d’analyses réduisent l’innovativité à un seul facteur (taille,
            âge, R&amp;D…). Les contre-exemples abondent : des entreprises
            matures innovent, des jeunes échouent. La réalité est
            <em> combinatoire</em>.
          </p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card p-4">
          <div className="text-sm font-semibold text-[#0c3d5e] mb-1">Démarche</div>
          <p className="text-sm text-foreground/80">
            Analyse fsQCA sur <strong>60 entreprises Forbes (2018)</strong> à partir de
            7 facteurs : intensité R&amp;D, taille, âge, place de l’innovation
            dans les valeurs, aversion au risque, écosystème (hub), présence
            d’un responsable Innovation au COMEX.
          </p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card p-4">
          <div className="text-sm font-semibold text-[#0c3d5e] mb-1">Solution</div>
          <p className="text-sm text-foreground/80">
            Six <strong>combinaisons gagnantes</strong> montrent qu’il existe
            plusieurs chemins vers l’innovativité : on peut être <em>mature</em>
            et innovant, la prise de risque n’est pas toujours nécessaire, et
            l’écosystème n’est pas décisif dans tous les cas.
          </p>
        </div>
      </div>

      {/* Figure */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-b from-white to-muted/40">
        <div className="aspect-[16/9] grid place-items-center">
          <img
            src={publicUrl("1-arch.png")}
            alt="Synthèse visuelle des archétypes d’entreprises innovantes"
            className="h-full w-full object-cover"
            loading="lazy"
            onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
          />
        </div>
      </div>

      {/* Résultats : six archétypes */}
      <SectionTitle>Résultats : six archétypes</SectionTitle>
      <ul className="list-disc ml-5 space-y-2">
        <Bullet>
          <strong>Les géants du web</strong> — jeunes, preneurs de risques, innovation
          peu affichée comme valeur ; forte manœuvrabilité, R&amp;D importante en
          absolu mais modeste rapportée au CA.
        </Bullet>
        <Bullet>
          <strong>Les explorateurs</strong> — petites/jeunes, ancrées dans un hub
          d’innovation ; innovantes même sans culture d’innovation formalisée.
        </Bullet>
        <Bullet>
          <strong>Les passionnés</strong> — jeunes, hub, innovation au cœur des
          valeurs, COMEX innovation, R&amp;D relative modérée ; cas très présents
          dans la littérature.
        </Bullet>
        <Bullet>
          <strong>Les planificateurs</strong> — jeunes, forte R&amp;D, aversion au
          risque, culture d’innovation peu mise en avant ; l’effort R&amp;D compense.
        </Bullet>
        <Bullet>
          <strong>Le luxe</strong> — petites, matures, faible R&amp;D et risque ; la
          créativité et le design priment sur la techno ; capacité à être
          disruptives hors des « dogmes ».
        </Bullet>
        <Bullet>
          <strong>Les engagés</strong> — jeunes/petites, forte R&amp;D, innovation
          valeur cardinale, COMEX innovation ; la présence dans un hub n’est pas
          toujours nécessaire.
        </Bullet>
      </ul>

      {/* Cadre d'analyse résumé */}
      <SectionTitle>Méthodologie (fsQCA) — facteurs analysés</SectionTitle>
      <KPIGrid
        items={[
          { label: "Capacité", value: "R&D / CA" },
          { label: "Structure", value: "Taille • Âge" },
          { label: "Culture", value: "Valeurs • Risque" },
          { label: "Écosystème", value: "Hub d’innovation" },
          { label: "Gouvernance", value: "COMEX Innovation" },
          { label: "Objectif", value: "Combinaisons causales" },
        ]}
      />

      {/* Enseignements */}
      <SectionTitle>Enseignements</SectionTitle>
      <ul className="list-disc ml-5 space-y-1">
        <Bullet>On peut être <strong>mature</strong> et innovant.</Bullet>
        <Bullet>La <strong>prise de risque</strong> n’est pas toujours nécessaire.</Bullet>
        <Bullet>L’<strong>écosystème</strong> aide, mais n’est pas décisif.</Bullet>
        <Bullet>Il n’existe pas « une » recette, mais des <strong>chemins</strong>.</Bullet>
      </ul>

      {/* Limites */}
      <SectionTitle>Limites & pistes</SectionTitle>
      <Callout title="À garder en tête">
        Le classement Forbes repose en partie sur des métriques boursières
        (possibles biais de spéculation) et exclut les non-cotées. D’autres
        combinaisons peuvent exister. Pistes : mieux comprendre <em>comment</em>
        des entreprises matures deviennent innovantes pour rivaliser avec les
        entrants.
      </Callout>

      {/* Auteur */}
      <SectionTitle>À propos de l’auteur</SectionTitle>
      <p className="leading-relaxed text-foreground/80">
        Joël Perez Torrents est doctorant au Centre de Recherche en Gestion de
        l’École Polytechnique. Ses travaux portent sur l’IA appliquée à la
        personnalisation du parcours patient et la transformation des modèles
        économiques. Il partage ses réflexions sur{" "}
        <a
          href="https://jptorrents.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-[#0c3d5e]/30 underline-offset-4 hover:text-[#0c3d5e]"
        >
          son blog
        </a>.
      </p>

      {/* Références (abrégé & propre) */}
      <SectionTitle>Références (sélection)</SectionTitle>
      <ul className="list-disc ml-5 space-y-1 text-sm text-foreground/80">
        <Bullet>Forbes (2018) — The World’s Most Innovative Companies.</Bullet>
        <Bullet>Hurley &amp; Hult (1998, 2004) — Culture &amp; innovation.</Bullet>
        <Bullet>Damanpour (1992) — Innovation &amp; structure.</Bullet>
        <Bullet>Garcia &amp; Calantone (2002) — Typologies d’innovation.</Bullet>
        <Bullet>Provan &amp; Kenis (2007) — Gouvernance en réseau.</Bullet>
      </ul>
    </>
  );

    default:
      return (
        <>
          <Lead>
            Contenu à venir. En attendant, vous pouvez télécharger la
            publication ci-dessous.
          </Lead>
        </>
      );
  }
}

/* ------------------------------------------------------------------ */
/*                                Page                                 */
/* ------------------------------------------------------------------ */

export default function ArticleDetail() {
  const { t } = useTranslation();
  const { slug = "" } = useParams<{ slug: string }>();
  const article = useMemo(() => ARTICLES.find((a) => a.slug === slug), [slug]);
  
  // États pour le popup de téléchargement
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // CSS global pour les listes premium
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .premium-list {
        list-style: none !important;
        margin-left: 0 !important;
        padding-left: 0 !important;
      }
      .premium-list li {
        position: relative;
        padding-left: 1.5rem;
        margin-bottom: 0.75rem;
      }
      .premium-list li::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.6em;
        width: 6px;
        height: 6px;
        background: linear-gradient(45deg, #0c3d5e, #dfaf2c);
        border-radius: 50%;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Barre de progression de lecture
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      setProgress(height > 0 ? (scrolled / height) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <Container>
          <div className="pt-28 pb-24 text-center">
            <h1 className="text-3xl font-bold mb-3">
              {t("article.notFound", { defaultValue: "Article introuvable" })}
            </h1>
            <Link to="/publications">
              <Button variant="outline">
                {t("article.backToList", {
                  defaultValue: "Retour aux publications",
                })}
              </Button>
            </Link>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  const theme = THEME[article.thematic];
  const pdfUrl = publicUrl(`pdfs/${article.file}`);
  const coverUrl = coverFromPdfFile(article.file);

  const handleDownloadClick = () => {
    // Si c'est le Managuide d'innovation, afficher le popup
    if (article.slug === 'managuide-innovation') {
      setShowDownloadDialog(true);
    } else {
      // Téléchargement direct pour les autres articles
      directDownload();
    }
  };

  const directDownload = () => {
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = article.file;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.firstName || !formData.lastName) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Préparer les données à envoyer
      const downloadData: ManaguideDownloadData = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        downloadedAt: new Date().toISOString(),
        userAgent: navigator.userAgent,
      };
      
      const welcomeData = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
      };
      
      // Envoyer les emails en parallèle
      const [notificationResult, welcomeResult] = await Promise.allSettled([
        sendManaguideNotification(downloadData),
        sendWelcomeEmail(welcomeData)
      ]);
      
      // Log des résultats
      if (notificationResult.status === 'fulfilled') {
        console.log('✅ Notification interne envoyée');
      } else {
        console.warn('⚠️ Échec notification interne:', notificationResult.reason);
      }
      
      if (welcomeResult.status === 'fulfilled') {
        console.log('✅ Email de bienvenue envoyé');
      } else {
        console.warn('⚠️ Échec email de bienvenue:', welcomeResult.reason);
      }
      
      // Fermer le popup et déclencher le téléchargement
      setShowDownloadDialog(false);
      directDownload();
      
      // Réinitialiser le formulaire
      setFormData({ email: '', firstName: '', lastName: '' });
      
      console.log('✅ Téléchargement initié et emails traités');
      
    } catch (error) {
      console.error('❌ Erreur lors du processus:', error);
      // Même en cas d'erreur email, on permet le téléchargement
      setShowDownloadDialog(false);
      directDownload();
      setFormData({ email: '', firstName: '', lastName: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Barre de progression lecture */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-50">
        <div
          className="h-full bg-gradient-to-r from-[#0c3d5e] to-manamind transition-[width] duration-150 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Navigation />

      {/* HERO PREMIUM */}
      <section className="relative pt-28 pb-16 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        {/* Halos premium animés */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className={`absolute -top-48 -left-40 w-[50rem] h-[50rem] rounded-full bg-gradient-to-br ${theme.halo} opacity-30 blur-3xl animate-pulse`}
          />
          <div
            className={`absolute -bottom-48 -right-40 w-[50rem] h-[50rem] rounded-full bg-gradient-to-tr from-[#0c3d5e]/20 to-[#dfaf2c]/30 opacity-25 blur-3xl`}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50 blur-2xl" />
        </div>

        <Container>
          <Link to="/publications">
            <Button
              variant="ghost"
              size="sm"
              className="mb-6 hover:bg-white/60 hover:backdrop-blur-sm transition-all duration-300 hover:-translate-x-1 transform rounded-xl px-4 py-2 border border-white/20"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("article.backToList", {
                defaultValue: "Retour aux publications",
              })}
            </Button>
          </Link>

          {/* Header + Cover + CTA (1 seul bouton) */}
          <div className="space-y-6">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <Badge className={`${theme.chip} px-4 py-2 rounded-full font-semibold shadow-sm border-0 backdrop-blur-sm`}>
                  <span className="inline-flex items-center gap-2">
                    {theme.icon}
                    {article.thematic}
                  </span>
                </Badge>
                <Badge variant="outline" className="px-4 py-2 rounded-full font-medium border-slate-200 bg-white/60 backdrop-blur-sm">
                  {article.type}
                </Badge>
                {article.publishedAt && (
                  <span className="text-sm text-slate-500 bg-white/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
                    {article.publishedAt}
                  </span>
                )}
              </div>

              <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#0c3d5e] via-[#dfaf2c] to-[#0c3d5e] mb-6">
                {article.title}
              </h1>

              {article.excerpt && (
                <p className="text-xl md:text-2xl text-slate-600 max-w-4xl leading-relaxed font-medium">
                  {article.excerpt}
                </p>
              )}

              {/* CTA Premium */}
              <div className="mt-8 flex items-center gap-4">
                <Button
                  onClick={handleDownloadClick}
                  className="h-12 px-6 bg-gradient-to-r from-[#0c3d5e] via-[#dfaf2c] to-[#0c3d5e] hover:shadow-lg text-white font-semibold rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 transform"
                  aria-label={t("article.download", {
                    defaultValue: "Télécharger le PDF",
                  })}
                >
                  <Download className="mr-2 h-5 w-5" />
                  {t("article.download", { defaultValue: "Télécharger le PDF" })}
                </Button>
                
                {article.slug === 'managuide-innovation' && (
                  <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full border border-white/20">
                    <Sparkles className="h-4 w-4 text-[#dfaf2c]" />
                    <span>Guide premium</span>
                  </div>
                )}
              </div>
            </div>

            {/* Cover Premium */}
            <div className="group overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-b from-white/80 to-slate-50/60 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-700">
              <div className="aspect-[16/9] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/20 z-10" />
                <img
                  src={coverUrl}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* BODY PREMIUM */}
      <section className="pb-24 bg-gradient-to-b from-slate-50/30 to-white">
        <Container>
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-white/20 shadow-xl p-8 md:p-12 -mt-8 relative z-10">
            <RichBody article={article} />
          </div>
        </Container>
      </section>

      <Footer />
      
      {/* Dialog Popup pour téléchargement Managuide */}
      <Dialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
        <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-xl border-white/20 shadow-2xl rounded-3xl">
          <DialogHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#0c3d5e] to-[#dfaf2c] rounded-2xl flex items-center justify-center mb-4">
              <Download className="h-8 w-8 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold text-[#0c3d5e]">
              Accéder au Managuide de l'innovation
            </DialogTitle>
            <DialogDescription className="text-base text-slate-600 leading-relaxed">
              Pour télécharger notre guide premium, merci de renseigner vos informations. 
              Vous recevrez également nos actualités innovation.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleFormSubmit} className="space-y-6 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-semibold text-[#0c3d5e]">
                  Prénom *
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="h-12 border-slate-200 focus:border-[#0c3d5e] focus:ring-[#0c3d5e] rounded-xl"
                  placeholder="Votre prénom"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-semibold text-[#0c3d5e]">
                  Nom *
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="h-12 border-slate-200 focus:border-[#0c3d5e] focus:ring-[#0c3d5e] rounded-xl"
                  placeholder="Votre nom"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-[#0c3d5e]">
                Email professionnel *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="h-12 border-slate-200 focus:border-[#0c3d5e] focus:ring-[#0c3d5e] rounded-xl"
                placeholder="votre.email@entreprise.com"
                required
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowDownloadDialog(false)}
                className="flex-1 h-12 rounded-xl border-slate-200 hover:bg-slate-50"
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={!formData.email || !formData.firstName || !formData.lastName || isSubmitting}
                className="flex-1 h-12 bg-gradient-to-r from-[#0c3d5e] to-[#dfaf2c] hover:shadow-lg text-white font-semibold rounded-xl transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Téléchargement...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger le guide
                  </>
                )}
              </Button>
            </div>
            
            <p className="text-xs text-slate-500 text-center leading-relaxed">
              En soumettant ce formulaire, vous acceptez de recevoir nos communications sur l'innovation. 
              Vous pouvez vous désabonner à tout moment.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
