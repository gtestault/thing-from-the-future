import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PlayerService} from '../../services/player.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {ROOM_SELECTION_PATH, WAITING_ROOM_PATH} from '../../routes';
import {showErrorSnackbar} from '../../utils/snackbar';


@Component({
  selector: 'app-username-selection',
  templateUrl: './username-selection.component.html',
  styleUrls: ['./username-selection.component.scss']
})
export class UsernameSelectionComponent implements OnInit {
  validPattern = '^[a-zA-Z0-9]*$';
  usernameForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern(this.validPattern)])
  });
  requestedRoomId: string | null = null;

  constructor(
    private playerService: PlayerService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.roomId) {
        this.requestedRoomId = params.roomId;
      }
    });
    if (this.playerService.isRegistered()) {
      this.redirectToRoomSelection();
    }
  }

  private redirectToRoomSelection(): void {
    if (this.requestedRoomId) {
      this.router.navigateByUrl(`${WAITING_ROOM_PATH}/${this.requestedRoomId}`);
    } else {
      this.router.navigateByUrl(ROOM_SELECTION_PATH);
    }
  }

  async onSubmit(): Promise<void> {
    const requestedUsername = this.usernameForm.get('username')?.value;
    try {
      await this.playerService.registerPlayer(requestedUsername);
      this.snackBar.open(`Your username has been set`, 'OK', {duration: 4000, panelClass: 'success-snackbar'});
      this.redirectToRoomSelection();
    } catch (e: any) {
      showErrorSnackbar(this.snackBar, `Couldn't set username: ${e.toString()}`);
    }
  }

  getErrorMessage(): string {
    if (this.usernameForm.hasError('required')) {
      return 'You must enter a username';
    } else if (this.usernameForm.hasError('minlength')) {
      return 'Username must be at least 4 characters long';
    }
    return this.usernameForm.hasError('pattern') ? 'Username can only be composed of letters and numbers.' : '';
  }
}
