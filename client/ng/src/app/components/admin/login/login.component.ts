import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Credentials } from "jeudemots-shared";
import { AuthService } from "@servicesauth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  status: "idle" | "pending" | "ok" | "ko" = "idle";
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
  submitted = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.auth.isLogged()) this.router.navigate(["admin/dashboard"]);
  }

  async submit() {
    if (!this.form.valid) return;

    this.status = "pending";
    const credentials: Credentials = {
      ...this.form.getRawValue(),
    };
    const response = await this.auth.login(credentials);

    if (response.ok) {
      const route =
        this.route.snapshot.queryParams["redirect"] || "admin/dashboard";
      if (!(await this.router.navigate([route]))) {
        console.error("Unable to navigate!");
      }
      this.status = "ok";
    } else {
      this.status = "ko";
    }
    this.reset();
  }

  reset() {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.form.updateValueAndValidity();
  }
}
