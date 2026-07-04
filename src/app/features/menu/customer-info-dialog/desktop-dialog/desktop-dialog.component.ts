import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-desktop-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './desktop-dialog.component.html',
  styleUrl: './desktop-dialog.component.scss'
})
export class DesktopDialogComponent {
}

