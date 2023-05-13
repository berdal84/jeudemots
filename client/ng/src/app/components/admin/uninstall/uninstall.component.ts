import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { APIService } from "@components/backend/api/api.service";
import { FormStatus } from "@models/form-status";

@Component({
  selector: "app-uninstall",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./uninstall.component.html",
  styleUrls: ["./uninstall.component.scss"],
})
export class UninstallComponent {
  private api = inject(APIService);
  status = signal<FormStatus>('pending');
  form = new FormGroup({
    agree: new FormControl<boolean | null>(null, {
      validators: [Validators.requiredTrue],
      updateOn: "change",
    }),
  });
  get agree() { return this.form.controls.agree}

  async handleSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    };

    this.status.set('processing');
    const result = await this.api.uninstall();
    if (result.ok) {
      this.form.reset();
      this.status.set('success');
    } else {
      this.status.set('error');
    }
  }

  handleReset() {
    this.status.set('pending');
    this.form.reset();
  }
}
