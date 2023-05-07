import { AuthService, AuthStatus } from "@components/backend/auth/auth.service";
import { BehaviorSubject } from "rxjs";

export class AuthServiceMock implements Pick<AuthService, 'isLogged' | 'userStatus$'> {

    userStatus$ = new BehaviorSubject<AuthStatus>({
        username: 'mock',
        is_logged: false,
    });

    isLogged(): boolean {
        return this.userStatus$.value.is_logged;
    }
}