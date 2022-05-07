import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { Status } from '../enums/status.enum';

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
    this.status         = Status.IDLE;
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
      const result = await this.jokeService.install();
      if( result ) 
      {
        this.form.reset();
        this.status = Status.SUCCESS;
      }
      else
      {
        this.status = Status.ERROR;
      }
    }
  }

  /**
   * Reset form
   */
  onReset() {
    this.status = Status.IDLE;
    this.form.reset();
  }

  /**
   * Shortcut to this.contributeForm.controls
   */
  get controls() {
    return this.form.controls;
  }

}
