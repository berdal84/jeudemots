import { Component, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { AuthService } from "@components/backend/auth/auth.service";
import { CommonModule } from "@angular/common";
import { FormStatus } from "src/app/models/form-status";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  status = signal<FormStatus>('pending');
  form = new FormGroup({
    username: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.auth.checkIfConnectedOnBackend().then( isLogged => isLogged && this.router.navigate(["/admin"] ));
  }

  get password() { return this.form.controls.password }
  get username() { return this.form.controls.username }

  async submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set("pending");
    const response = await this.auth.login(this.form.getRawValue());

    if (response.ok) {
      const route =
        this.route.snapshot.queryParams["redirect"] || "/admin";
      if (!(await this.router.navigate([route]))) {
        console.error("Unable to navigate!");
      }
      this.status.set('success');
    } else {
      this.status.set('error');
    }
    this.form.reset();
  }
}
