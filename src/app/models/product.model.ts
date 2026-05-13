export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  priceUnit: 'day' | 'half-day';
  width: number;
  height: number;
  length: number;
  capacity: number;
  images: string[];
  category: ProductCategory;
  available: boolean;
  featured: boolean;
}

export type ProductCategory = 'classic' | 'themed' | 'combo' | 'water' | 'obstacle' | 'castle' | 'bubble house';
