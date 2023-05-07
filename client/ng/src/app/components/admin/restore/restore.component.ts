import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from "@angular/forms";
import { APIService } from "@components/backend/api/api.service";
import { FormStatus } from '@models/form-status';

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
  private api = inject(APIService);
  status = signal<FormStatus>('idle');
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

  get file() { return this.form.controls.file }
  get agree() { return this.form.controls.agree }

  handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    if (files.length > 0) {
      this.form.patchValue({
        fileSrc: files[0],
      });
    }
  }

  async handleSubmit() {
    const file = this.form.getRawValue().fileSrc;

    if (!file || !this.form.valid) {
      this.form.markAllAsTouched();
      return;
    };

    this.status.set("pending");
    const formData = new FormData();
    formData.append("file", file);

    const result = await this.api.restore(formData);
    if (result.ok) {
      this.form.reset();
      this.status.set("ok");
    } else {
      this.status.set("ko");
    }
  }

  handleReset() {
    this.status.set('idle');
    this.form.reset();
  }

}
