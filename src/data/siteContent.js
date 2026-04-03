import { Globe, Target, Building, Leaf, Zap, Users } from 'lucide-react'

/** Fichiers sous public/images/ (URL encodée ; NFD macOS pour certains noms) */
const IMG_FORUM = 'Projet - Forum me\u0301dite\u0301ranne\u0301en .png'
const IMG_ECO = 'Projet - Eco-gestion des Eaux Use\u0301es.jpg'

function publicImage(filename) {
  return '/images/' + encodeURIComponent(filename)
}

export const brand = {
  logo: '/logo/LOGO.png',
  logoAlt: 'Energy Cities Algeria — ECA',
}

export const images = {
  hero: publicImage("Image d'accueil.jpg"),
  heroFallback:
    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1920&q=80',
  aboutTeam: publicImage('Photo membres association.jpeg'),
  aboutTeamFallback:
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  president: publicImage('hasnisidali.png'),
}

/** Logos partenaires (public/images/) */
export const partners = [
  { name: 'APRUE', logo: publicImage('Partenaire APRUE.png'), alt: 'Logo APRUE' },
  { name: 'CEREFE', logo: publicImage('Partenaire CEREFE.png'), alt: 'Logo CEREFE' },
  { name: 'CNFE', logo: publicImage('Partenaire CNEFE.png'), alt: 'Logo CNFE' },
]

export const colors = {
  primary: '#4CAF50',
  primaryDark: '#2E7032',
  primaryLight: '#81C784',
  accent: '#F5A623',
  dark: '#111111',
  darkSoft: '#1A1A1A',
  gray: '#B0BEC5',
  white: '#FFFFFF',
}

export const roadmapSteps = [
  {
    year: '2018',
    title: 'Fondation & Lancement',
    description:
      "Création de l'ECA par Hasni Sid Ali. Positionnement comme référence nationale de la transition énergétique territoriale.",
  },
  {
    year: '2020',
    title: 'Expansion du Réseau',
    description:
      "Développement des premiers partenariats internationaux et ancrage de l'expertise auprès des collectivités locales algériennes.",
  },
  {
    year: '2023',
    title: 'Consolidation Stratégique',
    description:
      "Lancement de projets d'envergure (Commune Verte, INTERREG) et renforcement de la voix institutionnelle en Méditerranée.",
  },
  {
    year: '2026-2030',
    title: 'Vision & Leadership',
    description:
      'Devenir le pilier incontesté de la transition énergétique en Algérie avec un leadership sectoriel affirmé.',
  },
]

export const ecaProjects = [
  {
    title: 'Jumelage de Villes',
    description:
      "Programme de coopération inédit entre des municipalités algériennes et européennes pour l'échange d'expertises.",
    image: publicImage('Projet - jumelage 2 villes.png'),
    imageFallback:
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Projet Commune Verte',
    description:
      "Collaboration stratégique avec la GIZ pour le développement durable des communes et l'amélioration de l'efficacité énergétique.",
    image: publicImage('Projet - Commune verte.jpg'),
    imageFallback:
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Forum Méditerranéen',
    description:
      'Engagement actif dans les discussions régionales de haut niveau sur les enjeux cruciaux de la transition énergétique.',
    image: publicImage(IMG_FORUM),
    imageFallback:
      'https://images.unsplash.com/photo-1475721027785-f74dea9f2943?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Projet INTERREG-TRANSMED',
    description:
      'Accord historique AVITEM-ECA visant la décarbonation des ports méditerranéens par le transfert de technologies.',
    image: publicImage('Projet - INTERREG-TRANSMED.png'),
    imageFallback:
      'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Partenariat Solar Quarter',
    description:
      "Synergies et développement de solutions écologiques dans le secteur de l'énergie solaire (Chine-Algérie).",
    image: publicImage('Projet - Partenariat Solar Quarter.jpg'),
    imageFallback:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Eco-gestion des Eaux Usées',
    description:
      "Initiative centrée sur la gestion écologique, le traitement et la valorisation durable de l'eau.",
    image: publicImage(IMG_ECO),
    imageFallback:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Projet Innov-DEV',
    description:
      "Programme dédié à l'innovation et au développement des PME pour booster l'économie verte locale.",
    image:
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Convention CNFE',
    description:
      "Projet d'encadrement et de formations intensives dédiées à la protection de l'environnement.",
    image: publicImage('Partenaire CNEFE.png'),
    imageFallback:
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Convention AIG',
    description:
      "Plan d'actions national pour la rationalisation de l'utilisation du gaz industriel.",
    image: publicImage('Projet - Convention AIG.jpg'),
    imageFallback:
      'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
]

export const visionBlocks = [
  {
    icon: Globe,
    title: 'Notre Vision',
    subtitle: 'Équilibre et durabilité.',
    color: '#4CAF50',
    bg: '#e8f5e9',
    items: [
      "Atteindre l'équilibre besoins-planète.",
      'Innover pour un futur durable.',
      "Engager par l'éducation.",
    ],
  },
  {
    icon: Target,
    title: 'Nos Missions',
    subtitle: 'Accompagner l’avenir.',
    color: '#F5A623',
    bg: '#fff3e0',
    items: [
      'Sensibiliser aux enjeux énergétiques.',
      'Promouvoir les solutions vertes.',
      'Accompagner les villes.',
    ],
  },
  {
    icon: Building,
    title: 'Nos Objectifs',
    subtitle: 'Agir sur le terrain.',
    color: '#2E7032',
    bg: '#e8f5e9',
    items: [
      'Améliorer la qualité environnementale.',
      'Développement massif du renouvelable.',
      'Réduction de la consommation.',
    ],
  },
]

export const values = [
  {
    icon: Leaf,
    title: 'Engagement',
    color: '#4CAF50',
    desc: 'Nous sommes passionnément engagés dans la mission de protéger notre planète pour les générations futures, en mettant en œuvre des actions concrètes pour un impact positif durable.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    color: '#F5A623',
    desc: "Nous croyons en la puissance de l'innovation pour résoudre les défis environnementaux. La recherche de solutions créatives et durables est au cœur de notre démarche.",
  },
  {
    icon: Users,
    title: 'Collaboration',
    color: '#81C784',
    desc: "La protection de l'environnement est un effort collectif. ECA s'efforce de bâtir des partenariats forts avec les communautés, les entreprises, les institutions et les acteurs gouvernementaux pour multiplier les impacts positifs.",
  },
]
