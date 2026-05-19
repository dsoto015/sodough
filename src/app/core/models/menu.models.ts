export interface MenuItemOption {
  label: string;
  price: number;
  displayPrice: string;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  displayPrice?: string;
  image: string;
  alt: string;
  options?: MenuItemOption[];
}

export interface CartItem {
  id: number;
  cartId: string;
  name: string;
  price: number;
  quantity: number;
}