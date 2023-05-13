import { AuthService, AuthStatus } from "@components/backend/auth/auth.service";
import { BehaviorSubject, Observable } from "rxjs";

export class AuthServiceMock implements Pick<AuthService, 'checkIfConnectedOnBackend' | 'isConnected$' | 'userStatus$'> {

    userStatus$ = new BehaviorSubject<AuthStatus>(AuthStatus.Connected);
    isConnected$   = new BehaviorSubject<boolean>(true);

    async checkIfConnectedOnBackend(): Promise<boolean> {
        return this.userStatus$.value === AuthStatus.Connected;
    }
}
