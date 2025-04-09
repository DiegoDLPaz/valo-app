import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './confirmation-dialog.component.html'
})

export class ConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) { }

  onConfirm(): void {
    this.dialogRef.close(true); // Close dialog and return true
  }

  onCancel(): void {
    this.dialogRef.close(false); // Close dialog and return false
  }
}
