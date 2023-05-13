import { Component, inject, signal } from "@angular/core";
import { Validators, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { APIService } from "@components/backend/api/api.service";
import { Joke } from "jeudemots-shared";
import {environment} from "src/environments/environment";
import { CommonModule } from "@angular/common";
import { FormStatus } from "src/app/models/form-status";

@Component({
  selector: "app-contribute",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./contribute.component.html",
  styleUrls: ["./contribute.component.scss"],
})
export class ContributeComponent {
  status = signal<FormStatus>('pending');
  displayErrors = signal(false);
  email = environment.supportEmail;

  form = new FormGroup({
    category: new FormControl<string>("", {
      validators: [Validators.maxLength(20), Validators.required],
      updateOn: "change",
      nonNullable: true,
    }),

    text: new FormControl<string>("", {
      validators: [
        Validators.required,
        Validators.maxLength(250),
        Validators.minLength(5),
      ],
      updateOn: "change",
      nonNullable: true,
    }),

    author: new FormControl<string>("", {
      validators: Validators.required,
      updateOn: "change",
      nonNullable: true,
    }),

    acceptTerms: new FormControl<boolean>(false, {
      validators: Validators.requiredTrue,
      updateOn: "change",
      nonNullable: true,
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
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    };

    const { category, text, author } = this.form.getRawValue();
    const joke: Joke = {
      id: -1,
      category,
      text,
      author,
    };

    const response = await this.api.create(joke);
    if (response.ok) {
      this.form.reset();
      this.status.set('success');
    } else {
      this.status.set('error');
    }
  }

  /**
   * Reset form
   */
  onReset() {
    this.status.set('pending');
    this.form.reset();
  }

  get category() { return this.form.controls.category }
  get text() { return this.form.controls.text }
  get author() { return this.form.controls.author }
  get acceptTerms() { return this.form.controls.acceptTerms }
}
