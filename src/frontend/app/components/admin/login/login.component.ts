import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from 'src/frontend/app/services/backend.service';
import { UserService } from 'src/frontend/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;
  submited = false;
  status: Status = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) {
      this.form = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
      });

      if( this.userService.isLogged() )
      {
        this.router.navigate(['admin/dashboard']);
      }
    }

  async submit() {

    if( this.form.valid )
    {
      const response = await this.userService.login( this.form.value.username, this.form.value.password);

      if( response.status == Status.SUCCESS )
      {
        const route = this.route.snapshot.queryParams['redirect'] || 'admin/dashboard';
        if( !await this.router.navigate([route]) )
        {
          console.error('Unable to navigate!');
        }
      }

      this.status = response.status;
    }

    this.submited = true;
    this.form.markAllAsTouched();
  }

  reset() {
    this.submited = false;
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.form.updateValueAndValidity();
  }

}
