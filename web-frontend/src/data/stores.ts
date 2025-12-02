export type StoreCategory =
  | 'mercado'
  | 'farmacia'
  | 'beleza'
  | 'moda'
  | 'eletronicos'
  | 'jogos'
  | 'brinquedos'
  | 'casa'
  | 'outros';

export type Store = {
  id: number;
  slug: string;
  name: string;
  category: StoreCategory;
  categoryLabel: string;
  logo: string;
  image: string;       
  rating: number;       
  reviewsCount: number; 
  owner?: string;       
};

export const STORES: Store[] = [
  {
    id: 1,
    slug: 'cjr',
    name: 'CJR',
    category: 'mercado',
    categoryLabel: 'mercado',
    logo: '/images/lojas/cjr.svg',
    image: 'https://placehold.co/1200x600/ccc/fff?text=CJR',
    rating: 4.5,
    reviewsCount: 120,
  },
  {
    id: 2,
    slug: 'rare-beauty',
    name: 'Rare Beauty',
    category: 'beleza',
    categoryLabel: 'beleza',
    logo: '/images/lojas/rare-beauty.svg',
    image: '/images/banners/rare-beauty-banner.svg', 
    rating: 4.75,
    reviewsCount: 15, 
    owner: 'Selena Gomez',
  },
  {
    id: 3,
    slug: 'the-croc-brew',
    name: 'The Croc Brew',
    category: 'mercado',
    categoryLabel: 'mercado',
    logo: '/images/lojas/the-croc-brew.svg',
    image: 'https://placehold.co/1200x600/234/fff?text=Croc+Brew',
    rating: 4.8,
    reviewsCount: 85,
  },
  {
    id: 4,
    slug: 'mini-reno',
    name: 'Mini Reno',
    category: 'casa',
    categoryLabel: 'casa',
    logo: '/images/lojas/mini-reno.svg',
    image: 'https://placehold.co/1200x600/564/fff?text=Mini+Reno',
    rating: 4.2,
    reviewsCount: 40,
  },
  {
    id: 5,
    slug: 'amoca',
    name: 'amoca',
    category: 'moda',
    categoryLabel: 'moda',
    logo: '/images/lojas/amoca.svg',
    image: 'https://placehold.co/1200x600/876/fff?text=Amoca',
    rating: 4.9,
    reviewsCount: 210,
  },
  {
    id: 6,
    slug: 'repiit',
    name: 'Repiit',
    category: 'eletronicos',
    categoryLabel: 'eletrônicos',
    logo: '/images/lojas/repiit.svg',
    image: 'https://placehold.co/1200x600/123/fff?text=Repiit',
    rating: 4.6,
    reviewsCount: 90,
  },
  {
    id: 7,
    slug: 'electree',
    name: 'Electree',
    category: 'eletronicos',
    categoryLabel: 'eletrônicos',
    logo: '/images/lojas/electree.svg',
    image: 'https://placehold.co/1200x600/000/fff?text=Electree',
    rating: 4.3,
    reviewsCount: 55,
  },
];