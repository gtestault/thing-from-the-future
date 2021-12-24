import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {PlayerService} from "../services/player.service";

@Injectable({
  providedIn: 'root'
})
export class PlayerRegisteredGuard implements CanActivate {
  constructor(private playerService: PlayerService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.playerService.isRegistered()) {
      this.router.navigateByUrl('/')
      return false
    }
    return true
  }
}
