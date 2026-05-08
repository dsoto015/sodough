import { Injectable, computed, signal } from '@angular/core';
import { CartItem, MenuItem } from './models/menu.models';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private readonly cart = signal<CartItem[]>([]);
  readonly cartItems = this.cart.asReadonly();

  readonly itemCount = computed(() =>
    this.cart().reduce((total, item) => total + item.quantity, 0)
  );

  readonly total = computed(() =>
    this.cart().reduce((total, item) => total + item.price * item.quantity, 0)
  );

  addItem(item: MenuItem): void {
    this.cart.update(cart => {
      const existingItem = cart.find(cartItem => cartItem.id === item.id);

      if (!existingItem) {
        return [
          ...cart,
          {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
          }
        ];
      }

      return cart.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
    });
  }

  increaseQuantity(item: CartItem): void {
    this.cart.update(cart =>
      cart.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      )
    );
  }

  decreaseQuantity(item: CartItem): void {
    this.cart.update(cart =>
      cart.map(cartItem => 
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 }: cartItem
        ).filter(cartItem => cartItem.quantity > 0)
    );
  }

  removeItem(id: number): void {
    this.cart.update(cart => cart.filter(item => item.id !== id));
  }

  clearCart(): void {
    this.cart.set([]);
  }
}