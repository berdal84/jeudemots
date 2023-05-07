import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { APIService } from "@components/backend/api/api.service";

@Component({
  selector: "app-uninstall",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
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

  private api = inject(APIService);

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
    const result = await this.api.uninstall();
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
