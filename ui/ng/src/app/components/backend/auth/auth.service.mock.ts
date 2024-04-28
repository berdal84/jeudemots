import { AuthService, AuthStatus } from "@components/backend/auth/auth.service";
import { BehaviorSubject } from "rxjs";

export class AuthServiceMock implements Pick<AuthService, 'isConnected' | 'isConnected$' | 'userStatus$'> {

    userStatus$ = new BehaviorSubject<AuthStatus>(AuthStatus.Connected);
    isConnected$   = new BehaviorSubject<boolean>(true);

    isConnected(): boolean {
        return this.userStatus$.value === AuthStatus.Connected;
    }
}
