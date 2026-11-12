/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export type CategoryType = 
  | 'Grocery'
  | 'Fashion'
  | 'Electronics'
  | 'Home & Living'
  | 'Beauty'
  | 'Baby Care'
  | 'Sports'
  | 'Stationery'
  | 'Pet Care';

export interface ProductVariant {
  id: string;
  name: string; // e.g., "500g", "1kg" or "Red", "Blue" or "Medium", "Large"
  priceOffset: number; // added to base price
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  bnName?: string;
  category: CategoryType;
  price: number; // Base price in BDT
  discountPercent?: number; // e.g., 10 for 10%
  rating: number;
  ratingCount: number;
  image: string;
  gallery: string[];
  description: string;
  bnDescription?: string;
  stock: number;
  unit: string; // e.g., "kg", "pack", "pcs"
  variants?: ProductVariant[];
  featured?: boolean;
  flashSale?: boolean;
  flashSaleStockMax?: number;
  flashSaleStockSold?: number;
  reviews: Review[];
  specifications: Record<string, string>;
}

export interface Vehicle {
  id: string;
  type: 'Rent' | 'Sale';
  vehicleType: 'Car' | 'SUV' | 'Microbus' | 'Motorcycle' | 'Pickup';
  brand: string;
  model: string;
  year: number;
  mileage: number; // in km
  price: number; // in BDT (sale price or daily rent rate)
  fuelType: 'Octane' | 'CNG' | 'Hybrid' | 'Electric' | 'Diesel';
  transmission: 'Automatic' | 'Manual';
  seats: number;
  location: string; // e.g., "Chattogram GEC", "Dhaka Banani"
  features: string[];
  image: string;
  sellerName?: string;
  sellerContact?: string;
  isUserAdded?: boolean;
}

export interface CartItem {
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
}

export interface DeliveryInfo {
  fullName: string;
  phone: string;
  division: string;
  city: string;
  address: string;
  deliveryNotes?: string;
}

export interface Order {
  id: string;
  date: string;
  items: {
    productId: string;
    productName: string;
    variantName?: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  paymentMethod: 'bKash' | 'Nagad' | 'Rocket' | 'Card' | 'COD';
  deliveryInfo: DeliveryInfo;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  points: number;
  avatar: string;
  joinedDate: string;
}

export type ActiveTab = 'home' | 'product-detail' | 'store-locator' | 'user-dashboard';
