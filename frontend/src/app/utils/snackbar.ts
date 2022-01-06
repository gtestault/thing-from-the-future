import {MatSnackBar} from "@angular/material/snack-bar";

export function showErrorSnackbar(snackbar: MatSnackBar, message: string) {
  snackbar.open(message, "OK", {
    duration: 4000,
    panelClass: "error-snackbar"
  })
}
