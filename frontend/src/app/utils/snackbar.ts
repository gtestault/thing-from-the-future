import {MatSnackBar} from '@angular/material/snack-bar';

export function showErrorSnackbar(snackbar: MatSnackBar, message: string): void {
  snackbar.open(message, 'OK', {
    duration: 4000,
    panelClass: 'error-snackbar'
  });
}

export function showSuccessSnackbar(snackbar: MatSnackBar, message: string): void {
  snackbar.open(message, 'OK', {
    duration: 4000,
    panelClass: 'success-snackbar'
  });
}
