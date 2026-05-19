import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CartService } from '../../core/cart.service';
import { CartItem, MenuItem, MenuItemOption } from '../../core/models/menu.models';
import { CartComponent } from './cart/cart.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ CommonModule,
             MatCardModule,
             MatButtonModule,
             MatIconModule,
             MatBadgeModule,
             MatDialogModule,
             MatButtonToggleModule
            ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent {
  
  private readonly cartService = inject(CartService);
  private _snackbar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);
  private breakpointObserver = inject(BreakpointObserver);

  constructor() {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(takeUntilDestroyed())
      .subscribe(result => {
        this.isMobile.set(result.matches);
      });
  }

  isMobile = signal(false);
  fabRaised = signal(false);
  cart = this.cartService.cartItems;
  orderTotal = this.cartService.total;
  cartItemCount = this.cartService.itemCount;
  selectedOptions: Record<number, MenuItemOption> = {};

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
      price: 10,
      image: './images/bread/menu/cookies_1.png',
      alt: 'Chocolate chip cookies',
      options: [
        {
          label: '4-pack',
          price: 8,
          displayPrice: '$8 / 4-pack'
        },
        {
          label: '6-pack',
          price: 11,
          displayPrice: '$11 / 6-pack'
        },
        {
          label: '10-pack',
          price: 15,
          displayPrice: '$15 / 10-pack'
        }
      ]
    }
  ];

  getSelectedOption(item: MenuItem): MenuItemOption | undefined {
    return item.options ? this.selectedOptions[item.id] ?? item.options[0] : undefined;
  }

  selectOption(item: MenuItem, option: MenuItemOption): void {
    this.selectedOptions[item.id] = option;
  }

  getDisplayPrice(item: MenuItem): string {
    return this.getSelectedOption(item)?.displayPrice ?? item.displayPrice ?? `$${item.price}`;
  }  

  addToOrder(item: MenuItem): void {
    const selectedOption = this.getSelectedOption(item);

    if (this.isMobile()) {
      this.fabRaised.set(true);
    }

    const cartItem: CartItem = {
      id: item.id,
      cartId: selectedOption
        ? `${item.id}-${selectedOption.label}`
        : `${item.id}`,
      name: selectedOption
        ? `${item.name} (${selectedOption.label})`
        : item.name,
      price: selectedOption?.price ?? item.price,
      quantity: 1
    };

    this.cartService.addItem(cartItem);
    const snackBarRef = this._snackbar.open(cartItem.name + " added to cart!", "Undo", { duration: 3000 });

    snackBarRef.onAction().subscribe(() => {
      this.undoCartAdd(cartItem);
    });

    snackBarRef.afterDismissed().subscribe(() => {
      if (this.isMobile()) {
        this.fabRaised.set(false);
      }
    });
  }

  undoCartAdd(cartItem: CartItem): void {
    this.cartService.decreaseQuantity(cartItem);
  }

  openCart(): void {
    this.dialog.open(CartComponent, {
      width: '420px',
      maxWidth: '95vw'
    });
  }
}
