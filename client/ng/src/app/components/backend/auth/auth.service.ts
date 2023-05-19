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
  refreshTimeout:  number = 0;
  constructor( private api: APIService ) {}

  async login(credentials: Credentials): Promise<Response> {
    const response = await this.api.login(credentials);
    if( response.ok ) {
      this.userStatus$.next(AuthStatus.Connected);
      this.scheduleRefreshSession();
    } else {
      this.userStatus$.next(AuthStatus.Disconnected);
    }
    return response;
  }

  async logout(): Promise<Response> {
    const response = await this.api.logout();
    console.debug(this.userStatus$.value);
    this.userStatus$.next(AuthStatus.Disconnected)
    return response;
  }

  isConnected(): boolean {
    return this.userStatus$.getValue() === AuthStatus.Connected;
  }

  private scheduleRefreshSession(delay = 1000 * 4 * 60) { // refresh every 4min
    setTimeout( () => this.refreshSession(), delay)
  }

  private async refreshSession() {   
    const response = await this.api.refreshSession();
    if( !response.ok ) this.userStatus$.next(AuthStatus.Disconnected);
    else this.scheduleRefreshSession()
  }
}
