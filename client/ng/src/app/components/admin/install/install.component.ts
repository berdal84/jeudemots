import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { APIService } from '@components/backend/api/api.service';
import { FormStatus } from 'src/app/models/form-status';

@Component({
  selector: 'app-install',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.css']
})
export class InstallComponent {
  private api = inject(APIService);
  status = signal<FormStatus>('idle');
  form = new FormGroup({
    agree: new FormControl(
      false,
      {
        validators: [Validators.requiredTrue],
        updateOn: 'change',
        nonNullable: false
      }
    )
  });

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
    if ( this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('pending');
    const response = await this.api.install();
    if ( response.ok ) {
      this.form.reset();
      this.status.set('ok');
    } else {
      this.status.set('ko');
    }

  }

  /**
   * Reset form
   */
  onReset() {
    this.status.set('idle');
    this.form.reset();
  }

  get agree() { return this.form.controls.agree }
}
