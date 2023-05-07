import { inject } from '@angular/core';
import { CanActivateChildFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '@components/backend/auth/auth.service';

export const isLogged: CanActivateChildFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      const auth = inject(AuthService)
      const router = inject(Router);

      if( auth.isLogged() ) return true;

      return router.navigate(['/login'])
    };