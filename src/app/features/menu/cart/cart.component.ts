import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CustomerInfoDialogComponent } from '../customer-info-dialog/customer-info-dialog.component';
import { CartService } from '../../../core/cart.service';
import { CartItem } from '../../../core/models/menu.models';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private readonly cartService = inject(CartService);

  readonly cart = this.cartService.cartItems;
  readonly itemCount = this.cartService.itemCount;
  readonly orderTotal = this.cartService.total;

  constructor(
    private dialogRef: MatDialogRef<CartComponent>,
    private dialog: MatDialog
  ) {}

  requestOrder(): void {
    this.dialogRef.close();

    this.dialog.open(CustomerInfoDialogComponent, {
      width: '460px',
      maxWidth: '95vw',
      data: {
        cart: this.cart(),
        orderTotal: this.orderTotal()
      }
    });
  }

  decrementItem(item: CartItem): void {
    this.cartService.decreaseQuantity(item);
  }

  incrementItem(item: CartItem): void {
    this.cartService.increaseQuantity(item);
  }
}