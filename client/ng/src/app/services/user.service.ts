import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { BackendService} from './backend.service';
import { Credentials, Response } from 'jeudemots-shared';

interface User {
  user: string;
  is_logged: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  #currentUser: User;
  currentUserSubject: ReplaySubject<User>;

  constructor( private backend: BackendService ) {
    this.currentUserSubject = new ReplaySubject<User>(1);
    this.#currentUser = {
      user: null,
      is_logged: false,
    };
    this.notify();
  }

  async login(credentials: Credentials): Promise<Response> {
    const response = await this.backend.login(credentials);
    this.#currentUser = {
      user: credentials.username,
      is_logged: response.ok
    };
    this.notify();
    return response;
  }

  async logout(): Promise<Response> {
    const response = await this.backend.logout();
    this.#currentUser = {
      user: null,
      is_logged: false
    };
    this.notify();
    return response;
  }

  isLogged(): boolean {
    return this.#currentUser.is_logged;
  }

  notify(): void {
    this.currentUserSubject.next(this.#currentUser);
  }
}
