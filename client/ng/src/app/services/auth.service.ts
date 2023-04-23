import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackendService} from './backend.service';
import { Credentials, Response } from 'jeudemots-shared';

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

  constructor( private backend: BackendService ) {}

  async login(credentials: Credentials): Promise<Response> {
    const response = await this.backend.login(credentials);
    this.userStatus$.next( {
      username: credentials.username,
      is_logged: response.ok
    })
    return response;
  }

  async logout(): Promise<Response> {
    const response = await this.backend.logout();
    this.userStatus$.next( {
      username: null,
      is_logged: response.ok
    })
    return response;
  }

  isLogged(): boolean {
    return this.userStatus$.getValue().is_logged;
  }
}
