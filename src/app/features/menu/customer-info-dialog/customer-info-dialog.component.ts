import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
    email: '',
    phone: '',
    pickupDate: '',
    notes: ''
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CustomerInfoData,
    private dialogRef: MatDialogRef<CustomerInfoDialogComponent>
  ) { }

  sendOrder(): void {
    const orderDetails = this.data.cart
      .map(item =>
        `${item.name} x ${item.quantity} - $${item.price * item.quantity}`
      )
      .join('\n');

    const subject = encodeURIComponent('SoDough Bakery Order Request');

    const body = encodeURIComponent(`
New order request:

Customer Info:
Name: ${this.customer.name}
Email: ${this.customer.email}
Phone: ${this.customer.phone}
Pickup Date: ${this.customer.pickupDate}

Order:
${orderDetails}

Estimated Total: $${this.data.orderTotal}

Notes:
${this.customer.notes}
`);

    window.location.href =
      `mailto:ordersodough@gmail.com?subject=${subject}&body=${body}`;

    this.dialogRef.close();
  }
}