import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { UserService } from "./services/user.service";

@Injectable()
export class AppGuard implements CanActivate {

    constructor( private userService: UserService ) {}

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
        return this.userService.canVisit(next.pathFromRoot);
    }
  }