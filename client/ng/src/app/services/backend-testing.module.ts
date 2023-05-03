import { NgModule } from '@angular/core';
import { BackendService } from './backend.service';
import { AuthService } from './auth.service';
import { BackendServiceMock } from '@mocks/backend-service.mock';
import { AuthServiceMock } from '@mocks/auth-service.mock';
import { BrowserTestingModule } from '@angular/platform-browser/testing';

@NgModule({
    imports: [
        BrowserTestingModule
    ],
    providers: [
        {
            provide: BackendService,
            useClass: BackendServiceMock
        },
        {
            provide: AuthService,
            useClass: AuthServiceMock
        },
    ]
})
export class BackendTestingModule { }


