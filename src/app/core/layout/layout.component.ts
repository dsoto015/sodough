import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CartComponent } from '../../features/menu/cart/cart.component';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatDialogModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  private readonly cartService = inject(CartService);
  private readonly dialog = inject(MatDialog);

  itemCount = this.cartService.itemCount;

  openCart(): void {
    this.dialog.open(CartComponent, {
      width: '420px',
      maxWidth: '95vw'
    });
  }
}