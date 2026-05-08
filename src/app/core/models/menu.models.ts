export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  displayPrice: string;
  image: string;
  alt: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}