import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Credentials, Response } from 'jeudemots-shared';
import { APIService } from '../api/api.service';

export interface AuthStatus {
  username: string | null;
  is_logged: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** Current user status */
  readonly userStatus$ = new BehaviorSubject<AuthStatus>({
    username: null,
    is_logged: false,
  });

  constructor( private api: APIService ) {}

  async login(credentials: Credentials): Promise<Response> {
    const response = await this.api.login(credentials);
    this.userStatus$.next( {
      username: credentials.username,
      is_logged: response.ok
    })
    console.debug(this.userStatus$.value);
    return response;
  }

  async logout(): Promise<Response> {
    const response = await this.api.logout();
    console.debug(this.userStatus$.value);
    this.userStatus$.next( {
      username: null,
      is_logged: response.ok
    })
    return response;
  }

  isLogged(): boolean {
    console.debug(this.userStatus$.value);
    return this.userStatus$.value.is_logged;
  }
}
