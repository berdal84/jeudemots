import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService, Status } from 'src/frontend/app/services/backend.service';

@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.css']
})
export class InstallComponent implements OnInit {

  Status = Status; // expose to html

  status: Status;
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
      const response = await this.jokeService.install();
      if( response.status === Status.SUCCESS )
      {
        this.form.reset();
      }

      this.status = response.status;
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
