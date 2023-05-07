import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from "@angular/forms";
import { APIService } from "@components/backend/api/api.service";

@Component({
  selector: "app-restore",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./restore.component.html",
  styleUrls: ["./restore.component.css"],
})
export class RestoreComponent {
  status: 'idle' | "pending" | "ok" | "ko" = 'idle';
  /** display form errors */
  displayErrors: boolean = false;
  form = new FormGroup({
    file: new FormControl<string | null>(null, {
      validators: [Validators.required],
      updateOn: "change",
    }),
    agree: new FormControl(false, {
      validators: [Validators.requiredTrue],
      updateOn: "change",
    }),
    fileSrc: new FormControl<File | null>(null),
  });

  private api = inject(APIService);

  /**
   * Return true if form is invalid, false otherwise.
   */
  get invalid() {
    return this.form.invalid;
  }

  handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    if (files.length > 0) {
      this.form.patchValue({
        fileSrc: files[0],
      });
    }
  }

  /**
   * Submit form content only if form is valid
   */
  async onSubmit() {
    this.displayErrors = this.form.invalid;
    const file = this.form.getRawValue().fileSrc;

    if (!this.form.valid || ! file) return;

    this.status = "pending";
    const formData = new FormData();
    formData.append("file", file);

    const result = await this.api.restore(formData);
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
    this.status = 'idle';
    this.form.reset();
  }

  /**
   * Shortcut to this.contributeForm.controls
   */
  get controls() {
    return this.form.controls;
  }
}
