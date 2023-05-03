import { Component } from "@angular/core";
import { Validators, FormControl, FormGroup } from "@angular/forms";
import { BackendService } from "@services/backend.service";
import { Joke } from "jeudemots-shared";
import {environment} from "src/environments/environment";

@Component({
  selector: "app-contribute",
  templateUrl: "./contribute.component.html",
  styleUrls: ["./contribute.component.css"],
})
export class ContributeComponent {
  status: "idle" | "pending" | "ok" | "ko" = "idle";
  displayErrors = false;
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

    const { category, text, author } = this.form.getRawValue();
    const joke: Joke = {
      id: -1,
      category,
      text,
      author,
    };

    const response = await this.jokeService.create(joke);
    if (response.ok) {
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
