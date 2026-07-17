export type Level = "Débutant" | "Intermédiaire" | "Pro" | "Collection";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  level: Level;
  price: number;
  oldPrice?: number;
  badge?: string;
  /** Ligne d'infos courte affichée sous le badge de niveau. */
  meta: string;
  /** Photo produit dans public/. Tous les articles doivent en avoir une. */
  image: string;
  /** contain = produit détouré sur fond blanc, cover = photo d'ambiance. */
  imageFit?: "contain" | "cover";
};

// Prix AeroPlay : estimation fournisseur en USD x 10 (USD -> MAD) x 1.5 (marge 50 %),
// arrondi pour un prix e-commerce propre. Remplacer par les vrais prix grossiste quand le fournisseur confirme.
export const PRODUCTS: Product[] = [
  {
    id: "sport-cub-s2",
    name: "Sport Cub S2",
    tagline:
      "L'avion-école par excellence : gyro XPilot 6 axes, mousse EPP quasi incassable, hélice auto-détachable.",
    level: "Débutant",
    price: 599,
    badge: "Best-seller",
    meta: "Envergure 40 cm · 4 canaux · RTF",
    image: "/products/sport-cub-s2.jpg",
    imageFit: "contain",
  },
  {
    id: "p51d-mustang",
    name: "P-51D Mustang",
    tagline:
      "Le warbird légendaire avec stabilisation XPilot et voltige One-Key. Prêt à voler en 5 minutes.",
    level: "Intermédiaire",
    price: 679,
    meta: "Envergure 40 cm · 4 canaux · RTF",
    image: "/products/p51d-mustang.jpg",
    imageFit: "cover",
  },
  {
    id: "f4u-corsair",
    name: "F4U Corsair",
    tagline:
      "Le chasseur bleu marine mythique, gyro 6 axes et demi-tour One-Key. Environ 20 minutes de vol.",
    level: "Intermédiaire",
    price: 689,
    meta: "Envergure 40 cm · 4 canaux · RTF",
    image: "/products/f4u-corsair.jpg",
    imageFit: "contain",
  },
  {
    id: "p40-warhawk",
    name: "P-40 Warhawk",
    tagline:
      "Look agressif, gyro XPilot et deux batteries pour voler plus longtemps au parc.",
    level: "Intermédiaire",
    price: 689,
    badge: "Nouveau",
    meta: "Envergure 40 cm · 4 canaux · 2 batteries",
    image: "/products/p40-warhawk.jpg",
    imageFit: "contain",
  },
  {
    id: "t28-trojan",
    name: "T-28 Trojan",
    tagline:
      "Un trainer militaire stable, parfait pour progresser sans perdre le style.",
    level: "Débutant",
    price: 649,
    meta: "Envergure 40 cm · Gyro · RTF",
    image: "/products/t28-trojan.jpg",
    imageFit: "contain",
  },
  {
    id: "spitfire-400",
    name: "Spitfire 400",
    tagline:
      "Warbird britannique prêt à voler, avec stabilisation pour apprendre les virages propres.",
    level: "Intermédiaire",
    price: 689,
    meta: "Envergure 40 cm · 4 canaux · RTF",
    image: "/products/spitfire-400.jpg",
    imageFit: "contain",
  },
  {
    id: "bf109-400",
    name: "BF109 Easy Fly",
    tagline:
      "Petit warbird 3 canaux, simple à lancer et léger pour les premiers vols.",
    level: "Débutant",
    price: 359,
    badge: "Petit budget",
    meta: "Envergure 40 cm · 3 canaux · RTF",
    image: "/products/bf109-400.jpg",
    imageFit: "contain",
  },
  {
    id: "syma-v22-osprey",
    name: "SYMA V22 Osprey",
    tagline:
      "Mi-avion, mi-hélico : décollage vertical, maintien d'altitude et LED pour voler le soir.",
    level: "Débutant",
    price: 199,
    badge: "Fun",
    meta: "29 cm · 2.4 GHz · LED",
    image: "/products/syma-v22-osprey.jpg",
    imageFit: "cover",
  },
  {
    id: "f16-falcon",
    name: "F-16 Fighting Falcon",
    tagline:
      "Jet compact avec double moteur, stabilisation XPilot et décollage facile.",
    level: "Intermédiaire",
    price: 439,
    badge: "Jet",
    meta: "26 cm · 4 canaux · 2 moteurs",
    image: "/products/f16-falcon.jpg",
    imageFit: "contain",
  },
  {
    id: "ranger-600s",
    name: "Ranger 600S",
    tagline:
      "Planeur de débutant avec hélice arrière protégée : il pardonne beaucoup.",
    level: "Débutant",
    price: 829,
    meta: "Envergure 60 cm · 4 canaux · RTF",
    image: "/products/ranger-600s.jpg",
    imageFit: "contain",
  },
  {
    id: "ranger-2000",
    name: "Ranger 2000 FPV",
    tagline:
      "Grand planeur 2 m pour filmer, planer longtemps et apprendre le vol longue distance.",
    level: "Pro",
    price: 1799,
    meta: "Envergure 200 cm · 5 canaux · PNP",
    image: "/products/ranger-2000.jpg",
    imageFit: "contain",
  },
  {
    id: "asw28-sailplane",
    name: "ASW28 Sailplane",
    tagline:
      "Grand planeur brushless pour les pilotes qui veulent du vrai temps en l'air.",
    level: "Pro",
    price: 1949,
    meta: "Envergure 260 cm · 5 canaux · PNP",
    image: "/products/asw28-sailplane.jpg",
    imageFit: "contain",
  },
  {
    id: "p51-mustang-500",
    name: "P-51 Mustang 500",
    tagline:
      "Version brushless plus puissante, train d'atterrissage inclus et réponse plus sportive.",
    level: "Pro",
    price: 1729,
    meta: "Envergure 50 cm · Brushless · RTF",
    image: "/products/p51-mustang-500.jpg",
    imageFit: "contain",
  },
  {
    id: "malaysia-b777",
    name: "Boeing 777 Malaysia Airlines",
    tagline:
      "Modèle de collection en métal die-cast à l'échelle 1:400, avec socle. Non volant, 100 % déco.",
    level: "Collection",
    price: 49,
    meta: "Métal die-cast · 16 cm · Socle inclus",
    image: "/products/malaysia-b777.jpg",
    imageFit: "contain",
  },
];