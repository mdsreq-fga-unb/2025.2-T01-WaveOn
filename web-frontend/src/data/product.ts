export type ProductCategory =
  | "Mercado"
  | "Farmácia"
  | "Beleza"
  | "Moda"
  | "Eletrônicos"
  | "Jogos"
  | "Brinquedos"
  | "Casa"
  | "Outros";

export type ProductSummary = {
  id: string;
  name: string;
  price: string;
  unit?: string;
  image: string;
  seal: string;
  availability: "DISPONÍVEL" | "INDISPONÍVEL";
  category: ProductCategory;
};

export type ProductDetails = {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  rating: number;
  reviews: number;
  availability: "DISPONÍVEL" | "INDISPONÍVEL";
  stockCount: number;
  seal: string;
};

export const SLUG_TO_CATEGORY: Record<string, ProductCategory> = {
  mercado: "Mercado",
  farmacia: "Farmácia",
  beleza: "Beleza",
  moda: "Moda",
  eletronicos: "Eletrônicos",
  jogos: "Jogos",
  brinquedos: "Brinquedos",
  casa: "Casa",
  outros: "Outros",
};

export const CATEGORY_TO_SLUG: Record<ProductCategory, string> = {
  Mercado: "mercado",
  "Farmácia": "farmacia",
  Beleza: "beleza",
  Moda: "moda",
  "Eletrônicos": "eletronicos",
  Jogos: "jogos",
  Brinquedos: "brinquedos",
  Casa: "casa",
  Outros: "outros",
};

export const allProductSummaries: ProductSummary[] = [
  { id: "1",  name: "Brownie Meio A.",          price: "R$4,70",     image: "brownie-meio-amargo", seal: "cjr",               availability: "DISPONÍVEL",   category: "Mercado" },
  { id: "2",  name: "Brownie Trad.",            price: "R$3,80",     image: "brownie-tradicional", seal: "cjr",               availability: "INDISPONÍVEL", category: "Mercado" },
  { id: "3",  name: "Nozes",                    price: "R$29,99",    unit: "/kg", image: "nozes",           seal: "dcarts-&-baskets", availability: "DISPONÍVEL",   category: "Mercado" },
  { id: "4",  name: "Banana",                   price: "R$3,99",     unit: "/kg", image: "banana",          seal: "moumer",           availability: "DISPONÍVEL",   category: "Mercado" },
  { id: "5",  name: "Limão Siciliano",          price: "R$17,99",    unit: "/kg", image: "limao-siciliano",  seal: "moumer",           availability: "INDISPONÍVEL", category: "Mercado" },
  { id: "6",  name: "Leite",                    price: "R$4,99",     image: "leite-integral",      seal: "dcarts-&-baskets", availability: "DISPONÍVEL",   category: "Mercado" },
  { id: "7",  name: "Manteiga",                 price: "R$23,99",    image: "manteiga",            seal: "dcarts-&-baskets", availability: "DISPONÍVEL",   category: "Mercado" },
  { id: "8",  name: "Leite Cond.",              price: "R$7,99",     image: "leite-condensado",    seal: "dcarts-&-baskets", availability: "DISPONÍVEL",   category: "Mercado" },
  { id: "9",  name: "Coca Cola",                price: "R$3,99",     image: "coca-zero",           seal: "dcarts-&-baskets", availability: "INDISPONÍVEL", category: "Mercado" },
  { id: "10", name: "Farinha de T.",            price: "R$6,99",     image: "farinha-de-trigo",    seal: "dcarts-&-baskets", availability: "DISPONÍVEL",   category: "Mercado" },
  { id: "11", name: "Grand Theft Auto VI",      price: "499,99",     image: "nome",                seal: "magic-chicken",     availability: "INDISPONÍVEL", category: "Jogos" },
  { id: "12", name: "Redbull",                  price: "R$5,60",     image: "redbull",             seal: "cjr",               availability: "DISPONÍVEL",   category: "Mercado" },
  { id: "13", name: "Batom Liq.",               price: "R$149,99",   image: "batom-liq",           seal: "rare-beauty",       availability: "DISPONÍVEL",   category: "Beleza" },
  { id: "14", name: "Nike Dunk Ben&Jerry's",    price: "R$10.000,00",image: "nome",                seal: "sneaker-store",     availability: "DISPONÍVEL",   category: "Moda" },
  { id: "15", name: "Mouse Logitech G403",      price: "R$399,99",   image: "nome",                seal: "nako",              availability: "INDISPONÍVEL", category: "Eletrônicos" },
];


export const allProductDetails: ProductDetails[] = [
  {
    id: "1",
    name: "Brownie Meio Amargo 80g",
    price: 4.70,
    description: "Recheado com uma ganache de chocolate meio amargo bem cremosa, esse brownie conquistou o coração de muita gente!\n\nINGREDIENTES:\nAchocolatado em pó, farinha de trigo enriquecida com ferro e ácido fólico, chocolate meio amargo, açúcar, ovo, manteiga, cacau em pó, emulsificante: lecitina de soja, conservante: sorbato de potássio, propionato de cálcio e conservante para doces (sal refinado, iodo, dióxido de silício), aroma de baunilha.\n\nCONTÉM GLÚTEN.\nCONTÉM LACTOSE.\nALÉRGICOS: CONTÉM OVO E DERIVADOS DE LEITE, TRIGO E SOJA.",
    images: [
      "brownie-meio-amargo", //essa é a imagem principal
       "brownie-meio-amargo-2", //imagem 2
        "tabela-nutricional-brownie-meio-amargo"], //imagem 3 
    rating: 4.5,
    reviews: 15,
    availability: "DISPONÍVEL",
    stockCount: 3, 
    seal: "cjr"
  },
  {
    id: "2",
    name: "Brownie Tradicional 80g",
    price: 3.80,
    description: "O clássico brownie tradicional com pedaços de chocolate e muito sabor. Perfeito para qualquer hora do dia.",
    images: ["brownie-tradicional"],
    rating: 4.8,
    reviews: 22,
    availability: "INDISPONÍVEL",
    stockCount: 0,
    seal: "cjr"
  },
  {
    id: "4",
    name: "Banana",
    price: 3.99,
    description: "Banana fresca e saborosa, perfeita para lanches e sobremesas.",
    images: ["banana",
              "banana2",
              "banana3"],
              
    rating: 4.5,
    reviews: 10,
    availability: "DISPONÍVEL",
    stockCount: 12,
    seal: "moumer"
  }
  
];