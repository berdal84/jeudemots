import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { BackendService } from '@services/backend.service';
import { Status } from 'jeudemots-shared';

@Component({
  selector: 'app-uninstall',
  templateUrl: './uninstall.component.html',
  styleUrls: ['./uninstall.component.css']
})
export class UninstallComponent implements OnInit {

  Status = Status; // expose to html

  status: Status;
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
      const result = await this.jokeService.uninstall();
      if( result.status === Status.SUCCESS )
      {
        this.form.reset();
      }

      this.status = result.status;
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