import { NgModule } from '@angular/core';
import { APIServiceMock } from '@components/backend/api/api.service.mock';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { AuthService } from './auth/auth.service';
import { AuthServiceMock } from './auth/auth.service.mock';
import { APIService } from './api/api.service';

@NgModule({
    imports: [
        BrowserTestingModule,
    ],
    providers: [
        {
            provide: APIService,
            useClass: APIServiceMock
        },
        {
            provide: AuthService,
            useClass: AuthServiceMock
        },
    ]
})
export class BackendTestingModule { }


