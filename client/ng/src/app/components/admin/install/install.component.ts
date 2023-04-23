import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '@services/backend.service';

@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.css']
})
export class InstallComponent {
  status: 'idle' | 'pending' | 'ok' | 'ko';
  form = new FormGroup({
    agree: new FormControl(
    false,
    {
      validators: [Validators.required],
      updateOn: 'change',
      nonNullable: false
    })});
  displayErrors: boolean;

  constructor(private jokeService: BackendService) {
    this.displayErrors  = false;
    this.status         = 'idle';
  }

  /**
   * Return true if form is invalid, false otherwise.
   */
  get invalid() {
    return this.form.invalid;
  }

  /**
   * Submit form content only if form is valid
   */
  async onSubmit()
  {
    this.displayErrors = this.form.invalid;
    if ( !this.form.invalid)
    {
      this.status = 'pending';
      const response = await this.jokeService.install();
      if ( response.ok ) {
        this.form.reset();
        this.status = 'ok';
      } else {
        this.status = 'ko';
      }
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
