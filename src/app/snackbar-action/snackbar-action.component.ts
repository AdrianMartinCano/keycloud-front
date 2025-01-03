import { Component } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-action',
  templateUrl: './snackbar-action.component.html',
  styleUrls: ['./snackbar-action.component.css']
})
export class SnackbarActionComponent {
  constructor(private snackBarRef: MatSnackBarRef<SnackbarActionComponent>) {}

  confirm(): void {
    this.snackBarRef.dismissWithAction();
  }

  cancel(): void {
    this.snackBarRef.dismiss();
  }
}