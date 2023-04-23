import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { BackendService } from "@services/backend.service";

@Component({
  selector: "app-uninstall",
  templateUrl: "./uninstall.component.html",
  styleUrls: ["./uninstall.component.css"],
})
export class UninstallComponent {
  displayErrors: boolean = false;
  status: "idle" | "pending" | "ok" | "ko" = "idle";

  form = new FormGroup({
    agree: new FormControl<boolean | null>(null, {
      validators: [Validators.required],
      updateOn: "change",
    }),
  });

  constructor(private jokeService: BackendService) {}

  /**
   * Return true if form is invalid, false otherwise.
   */
  get invalid() {
    return this.form.invalid;
  }

  /**
   * Submit form content only if form is valid
   */
  async onSubmit() {
    this.displayErrors = this.form.invalid;
    if (this.form.invalid) return;

    this.status = "pending";
    const result = await this.jokeService.uninstall();
    if (result.ok) {
      this.form.reset();
      this.status = "ok";
    } else {
      this.status = "ko";
    }
  }

  /**
   * Reset form
   */
  onReset() {
    this.status = "idle";
    this.form.reset();
  }

  /**
   * Shortcut to this.contributeForm.controls
   */
  get controls() {
    return this.form.controls;
  }
}
