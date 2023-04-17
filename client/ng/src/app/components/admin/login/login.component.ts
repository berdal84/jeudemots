import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Status, Credentials} from 'jeudemots-shared';
import {UserService} from '@services/user.service';

@Component({
  selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: UntypedFormGroup;
  submitted = false;
  status: Status = null;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.form = new UntypedFormGroup({
      username: new UntypedFormControl('', [Validators.required]),
      password: new UntypedFormControl('', [Validators.required]),
    });

    if (this.userService.isLogged()) {
      this.router.navigate(['admin/dashboard']);
    }
  }

  async submit() {

    if (this.form.valid) {
      const credentials: Credentials = {
        username: this.form.value.username, password: this.form.value.password
      };
      const response = await this.userService.login(credentials);

      if (response.status === Status.SUCCESS) {
        const route = this.route.snapshot.queryParams['redirect'] || 'admin/dashboard';
        if (!await this.router.navigate([route])) {
          console.error('Unable to navigate!');
        }
      }

      this.status = response.status;
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
