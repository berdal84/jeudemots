import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BackendService } from '@services/backend.service';

@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.css']
})
export class InstallComponent implements OnInit {
  status: null | 'pending' | 'ok' | 'ko';
  /** main form group */
  form: UntypedFormGroup;
  /** display form errors */
  displayErrors: boolean;

  constructor(
    private jokeService: BackendService) {}

  ngOnInit() {
    this.displayErrors  = false;
    this.status         = null;
    this.form           = new UntypedFormGroup({});
    const agreeControl = new UntypedFormControl(
      null,
      {
        validators: [Validators.required],
        updateOn: 'change'
      });
    this.form.addControl('agree', agreeControl);
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
    this.status = null;
    this.form.reset();
  }

  /**
   * Shortcut to this.contributeForm.controls
   */
  get controls() {
    return this.form.controls;
  }

}
