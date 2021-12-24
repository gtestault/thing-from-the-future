import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PlayerService} from "../../services/player.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from "@angular/router";
import {WAITING_ROOM_PATH} from "../../routes";


@Component({
  selector: 'app-username-selection',
  templateUrl: './username-selection.component.html',
  styleUrls: ['./username-selection.component.scss']
})
export class UsernameSelectionComponent implements OnInit {
  validPattern = "^[a-zA-Z0-9]*$"
  usernameForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern(this.validPattern)])
  })

  constructor(
    private _playerService: PlayerService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    if (this._playerService.isRegistered()) {
      this._router.navigateByUrl(WAITING_ROOM_PATH)
    }
  }

  async onSubmit() {
    const requestedUsername = this.usernameForm.get("username")?.value
    try {
      await this._playerService.registerPlayer(requestedUsername)
      this._snackBar.open(`Your username has been set`, "OK", {duration: 4000, panelClass: "success-snackbar"})
    } catch (e) {
      this._snackBar.open(`Couldn't set username: ${e.toString()}`, "OK", {
        duration: 4000,
        panelClass: "error-snackbar"
      })
    }
  }

  getErrorMessage() {
    if (this.usernameForm.hasError('required')) {
      return 'You must enter a username';
    } else if (this.usernameForm.hasError('minlength')) {
      return 'Username must be at least 4 characters long';
    }
    return this.usernameForm.hasError('pattern') ? 'Username can only be composed of letters and numbers.' : '';
  }
}
