import { inject } from '@angular/core';
import { CanActivateChildFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '@components/backend/auth/auth.service';

export const isLogged: CanActivateChildFn =
    async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      const auth = inject(AuthService)
      const router = inject(Router);

      if( await auth.checkIfConnectedOnBackend() ) return true;

      return router.navigate(['/login'])
    };
