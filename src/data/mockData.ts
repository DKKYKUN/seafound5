export type Fish = {
  id: string;
  name: string;
  category: "Ikan" | "Udang" | "Cumi" | "Kepiting" | "Kerang";
  price: number;
  stock: number;
  unit: string;
  description: string;
  image: string;
  fishermanId: string;
  badge?: "Fresh Today" | "Best Seller" | "Limited Stock";
};

export type Fisherman = {
  id: string;
  name: string;
  location: string;
  experience: string;
  specialty: string;
  photo: string;
  phone: string;
  rating: number;
  reviews: number;
  description?: string;
  departure_time?: string;
  daily_catch?: string;
  gallery?: string; // JSON string array of URLs
};

export const fishData: Fish[] = [];
export const fishermenData: Fisherman[] = [];
export const categories = ["Semua", "Ikan", "Udang", "Cumi", "Kepiting", "Kerang"] as const;
