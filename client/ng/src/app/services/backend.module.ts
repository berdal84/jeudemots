import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BackendService } from './backend.service';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    BackendService,
    HttpClientModule,
    AuthService,
  ]
})
export class BackendModule { }
