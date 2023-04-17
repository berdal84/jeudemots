import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "@services/user.service";

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {

  constructor( private userService: UserService, private router: Router ) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

      if ( this.userService.isLogged() )
      {
        return true;
      }

      this.router.navigate(['/admin'], { queryParams: { redirect: state.url }});
      return false;
  }
}
