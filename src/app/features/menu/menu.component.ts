import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';

import { CartService } from '../../core/cart.service';
import { MenuItem } from '../../core/models/menu.models';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ CommonModule,
             MatCardModule,
             MatButtonModule,
             MatIconModule,
             MatBadgeModule,
             MatDialogModule 
            ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent {
  
  private readonly cartService = inject(CartService);

  cart = this.cartService.cartItems;
  orderTotal = this.cartService.total;
  cartItemCount = this.cartService.itemCount;

  menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Classic Sourdough',
      description: 'Our signature loaf made with a century old starter. Naturally fermented for a crisp crust and airy, flavorful crumb.',
      price: 10,
      displayPrice: '$10',
      image: './images/bread/menu/reg_sourdough_1.png',
      alt: 'Classic sourdough loaf'
    },
    {
      id: 2,
      name: 'Jalapeño Cheddar',
      description: 'A bold twist on our classic loaf with fresh jalapeños and melted cheddar baked into every bite.',
      price: 12,
      displayPrice: '$12',
      image: './images/bread/menu/jal_sourdough_1.png',
      alt: 'Jalapeño sourdough loaf'
    },
    {
      id: 3,
      name: 'Chocolate Chip Cookies',
      description: 'Soft, buttery cookies with rich chocolate and a hint of sea salt. Baked fresh weekly.',
      price: 6,
      displayPrice: '$6 / 6-pack',
      image: './images/bread/menu/cookies_1.png',
      alt: 'Chocolate chip cookies'
    }
  ];

  addToOrder(item: MenuItem): void {
    this.cartService.addItem(item);
  }
}