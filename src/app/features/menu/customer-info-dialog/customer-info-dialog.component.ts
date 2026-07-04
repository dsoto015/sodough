import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { environment } from '../../../../environments/environment.local';
import { DesktopDialogComponent } from './desktop-dialog/desktop-dialog.component';

interface CustomerInfoData {
  cart: {
    name: string;
    price: number;
    quantity: number;
  }[];
  orderTotal: number;
}

@Component({
  selector: 'app-customer-info-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './customer-info-dialog.component.html',
  styleUrl: './customer-info-dialog.component.scss'
})

export class CustomerInfoDialogComponent {
  minPickupDate = new Date();

  customer: {
    name: string;
    phone: string;
    pickupDate: Date | null;
    notes: string;
  } = {
    name: '',
    phone: '',
    pickupDate: null,
    notes: ''
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CustomerInfoData,
    private dialogRef: MatDialogRef<CustomerInfoDialogComponent>,
    private dialog: MatDialog
  ) {
    this.minPickupDate.setDate(this.minPickupDate.getDate() + 2);
  }

  sendText(): void {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      || window.matchMedia('(pointer: coarse)').matches
      || navigator.maxTouchPoints > 0;

    if (!isMobile) {
      this.dialog.open(DesktopDialogComponent, {
        width: '320px',
        maxWidth: '90vw',
        autoFocus: false,
        disableClose: false
      });
      return;
    }

    const phone = environment.orderPhoneNumber;
    const message = this.getOrderText();

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const separator = isIOS ? '&' : '?';

    const smsUrl = `sms:${phone}${separator}body=${encodeURIComponent(message)}`;
    window.open(smsUrl, '_self');
    this.dialogRef.close();
  }

  getOrderText(): string {
    const items = this.data.cart;

    if (items.length === 0) {
      return 'My cart is empty.';
    }

    const itemLines = items.map(item =>
      `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`
    );

    const total = this.data.orderTotal.toFixed(2);

    return [
      'New Order',
      '',
      'Customer Info:',
      `Name: ${this.customer.name}`,
      `Phone: ${this.customer.phone}`,
      `Pickup Date: ${this.customer.pickupDate ? this.customer.pickupDate.toLocaleDateString() : ''}`, '',
      'Order:', ...itemLines, '',
      `Total: $${total}`, '',
      'Notes:', this.customer.notes || 'None'
    ].join('\n');
  }

}