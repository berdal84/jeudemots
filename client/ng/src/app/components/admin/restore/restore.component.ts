import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators, UntypedFormControl } from '@angular/forms';
import { BackendService, Status } from 'src/app/services/backend.service';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.css']
})
export class RestoreComponent implements OnInit {

    Status = Status; // expose to html

    status: Status;
    /** main form group */
    form: UntypedFormGroup;
    /** display form errors */
    displayErrors: boolean;

    constructor( private jokeService: BackendService) {}

    ngOnInit() {
      this.displayErrors  = false;
      this.status         = null;
      this.form           = new UntypedFormGroup({});

      const fileControl = new UntypedFormControl(
        null,
        {
          validators: [Validators.required],
          updateOn: 'change'
        });

      const agreeControl = new UntypedFormControl(
        null,
        {
          validators: [Validators.requiredTrue],
          updateOn: 'change'
        });

      this.form.addControl('file', fileControl);
      this.form.addControl('agree', agreeControl);
      this.form.addControl('fileSrc', new UntypedFormControl());

    }

    /**
     * Return true if form is invalid, false otherwise.
     */
    get invalid() {
      return this.form.invalid;
    }

    onFileChange(event) {

      if (event.target.files.length > 0)
      {
        const file = event.target.files[0];
        this.form.patchValue({
          fileSrc: file
        });
      }
    }

    /**
     * Submit form content only if form is valid
     */
    async onSubmit()
    {
      this.displayErrors = this.form.invalid;
      if ( this.form.valid)
      {

        const formData = new FormData();
        formData.append('file', this.form.get('fileSrc').value);

        const result = await this.jokeService.restore(formData);
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
