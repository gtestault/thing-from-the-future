import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {PlayerService} from "../services/player.service";
import {WAITING_ROOM_JOIN_PATH, WAITING_ROOM_PATH_ROOM_ID_VARIABLE} from "../routes";

@Injectable({
  providedIn: 'root'
})
export class PlayerRegisteredGuard implements CanActivate {
  constructor(
    private playerService: PlayerService,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.playerService.isRegistered()) {
      this.redirectToUsernameSelection(route)
      return false
    }
    return true
  }

  redirectToUsernameSelection(routeSnapshot: ActivatedRouteSnapshot) {
      const isUsingJoinLink = routeSnapshot.routeConfig?.path && routeSnapshot.routeConfig.path === WAITING_ROOM_JOIN_PATH
      if (isUsingJoinLink) {
        const roomId = routeSnapshot.params[WAITING_ROOM_PATH_ROOM_ID_VARIABLE];
        if (roomId) {
          this.router.navigateByUrl(`/?roomId=${roomId}`)
          return
        }
      }
      this.router.navigateByUrl('/')
      return
    }
}
