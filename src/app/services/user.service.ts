import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  #currentUser: {
    login: string,
    logged: boolean;
  };

  constructor() {
    this.#currentUser = {
      login: 'Ay Dunno',
      logged: false
    }
  }

  async login(user: string, password: string): Promise<boolean> {
    // TODO: check login/pass on server side, set a session to identify this as logged user.
    this.#currentUser.logged = true;
    return true;
  }

  isLogged(): boolean {
    return this.#currentUser.logged;
  }
}
