import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Credentials, Response } from 'jeudemots-shared';
import { APIService } from '../api/api.service';

export enum AuthStatus {
  Disconnected,
  Connected,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** Current user status */
  readonly userStatus$ = new BehaviorSubject<AuthStatus>(AuthStatus.Disconnected);
  readonly isConnected$ = this.userStatus$.pipe(map(status => status === AuthStatus.Connected))
  constructor( private api: APIService ) {}

  async login(credentials: Credentials): Promise<Response> {
    const response = await this.api.login(credentials);
    this.userStatus$.next(AuthStatus.Connected)
    console.debug(this.userStatus$.value);
    return response;
  }

  async logout(): Promise<Response> {
    const response = await this.api.logout();
    console.debug(this.userStatus$.value);
    this.userStatus$.next(AuthStatus.Disconnected)
    return response;
  }

  async checkIfConnectedOnBackend(): Promise<boolean> {
    return (await this.api.isLogged()).ok;
  }
}
