import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Credentials} from 'jeudemots-shared';
import {AuthService} from '@servicesauth.service';

interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.css']
})
export class LoginComponent {
  status: null | 'pending' | 'ok' | 'ko';
  form: FormGroup<LoginForm>;
  submitted = false;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.status = null;
    if (this.auth.isLogged()) {
      this.router.navigate(['admin/dashboard']);
    }
  }

  async submit() {

    if (this.form.valid) {
      this.status = 'pending';
      const credentials: Credentials = {
        username: this.form.value.username,
        password: this.form.value.password
      };
      const response = await this.auth.login(credentials);

      if (response.ok) {
        const route = this.route.snapshot.queryParams['redirect'] || 'admin/dashboard';
        if (!await this.router.navigate([route])) {
          console.error('Unable to navigate!');
        }
        this.status = 'ok';
      } else {
        this.status = 'ko';
      }
    }

    this.submitted = true;
    this.form.markAllAsTouched();
  }

  reset() {
    this.submitted = false;
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.form.updateValueAndValidity();
  }

}
