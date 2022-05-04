import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../../services/user.service";

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {

  constructor( private userService: UserService ) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      return this.userService.canVisit(next.pathFromRoot);
  }
}