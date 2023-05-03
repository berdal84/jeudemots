import { AuthService } from "@services/auth.service";

export class AuthServiceMock implements Pick<AuthService, 'isLogged'> {
    isLogged(): boolean {
        return true;
    }
}