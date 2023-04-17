import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackendService } from '@services/backend.service';

@Component({
  selector: 'app-uninstall',
  templateUrl: './uninstall.component.html',
  styleUrls: ['./uninstall.component.css']
})
export class UninstallComponent implements OnInit {
  status: true | 'pending' | 'ok' | 'ko';
  /** main form group */
  form: FormGroup;
  /** display form errors */
  displayErrors: boolean;

  constructor(
    private jokeService: BackendService) {}

  ngOnInit() {
    this.displayErrors  = false;
    this.status         = null;
    this.form           = new FormGroup({});
    const agreeControl = new FormControl(
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
      const result = await this.jokeService.uninstall();
      if ( result.ok ) {
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
