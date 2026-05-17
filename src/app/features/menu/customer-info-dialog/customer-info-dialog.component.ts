import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { environment } from '../../../../environments/environment.local';

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
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './customer-info-dialog.component.html',
  styleUrl: './customer-info-dialog.component.scss'
})
export class CustomerInfoDialogComponent {
  customer = {
    name: '',
    phone: '',
    pickupDate: '',
    notes: ''
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CustomerInfoData,
    private dialogRef: MatDialogRef<CustomerInfoDialogComponent>
  ) { }

  sendText(): void {
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
      `Pickup Date: ${this.customer.pickupDate}`, '',
      'Order:', ...itemLines, '',
      `Total: $${total}`, '',
      'Notes:', this.customer.notes || 'None'
    ].join('\n');
  }

}