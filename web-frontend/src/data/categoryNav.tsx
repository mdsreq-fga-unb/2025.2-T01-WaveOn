import type { ReactNode } from "react";
import type { ProductCategory } from "./product";
import {
  FaShoppingCart,
  FaClinicMedical,
  FaSmile,
  FaTshirt,
  FaLaptop,
  FaGamepad,
  FaRobot,
  FaEllipsisH,
} from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";

export type CategorySlug =
  | "all"
  | "mercado"
  | "farmacia"
  | "beleza"
  | "moda"
  | "eletronicos"
  | "jogos"
  | "brinquedos"
  | "casa"
  | "outros";

export type CategoryNavItem = {
  slug: CategorySlug;
  label: string;
  href: string;
  icon?: ReactNode;
  category?: ProductCategory;
};

export const CATEGORY_NAV: CategoryNavItem[] = [
  { slug: "all", label: "Todos", href: "/ver_mais" },
  {
    slug: "mercado",
    label: "Mercado",
    href: "/ver_mais/mercado",
    icon: <FaShoppingCart />,
    category: "Mercado",
  },
  {
    slug: "farmacia",
    label: "Farmácia",
    href: "/ver_mais/farmacia",
    icon: <FaClinicMedical />,
    category: "Farmácia",
  },
  {
    slug: "beleza",
    label: "Beleza",
    href: "/ver_mais/beleza",
    icon: <FaSmile />,
    category: "Beleza",
  },
  {
    slug: "moda",
    label: "Moda",
    href: "/ver_mais/moda",
    icon: <FaTshirt />,
    category: "Moda",
  },
  {
    slug: "eletronicos",
    label: "Eletrônicos",
    href: "/ver_mais/eletronicos",
    icon: <FaLaptop />,
    category: "Eletrônicos",
  },
  {
    slug: "jogos",
    label: "Jogos",
    href: "/ver_mais/jogos",
    icon: <FaGamepad />,
    category: "Jogos",
  },
  {
    slug: "brinquedos",
    label: "Brinquedos",
    href: "/ver_mais/brinquedos",
    icon: <FaRobot />,
    category: "Brinquedos",
  },
  {
    slug: "casa",
    label: "Casa",
    href: "/ver_mais/casa",
    icon: <FaHouse />,
    category: "Casa",
  },
  {
    slug: "outros",
    label: "Outros",
    href: "/ver_mais/outros",
    icon: <FaEllipsisH />,
    category: "Outros",
  },
];
