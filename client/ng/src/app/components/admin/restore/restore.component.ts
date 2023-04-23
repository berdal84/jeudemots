import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BackendService } from '@services/backend.service';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.css']
})
export class RestoreComponent implements OnInit {
    status: null | 'pending' | 'ok' | 'ko';
    /** main form group */
    form: FormGroup;
    /** display form errors */
    displayErrors: boolean;

    constructor( private backend: BackendService) {}

    ngOnInit() {
      this.displayErrors  = false;
      this.status         = null;
      this.form           = new FormGroup({});

      const fileControl = new FormControl(
        null,
        {
          validators: [Validators.required],
          updateOn: 'change'
        });

      const agreeControl = new FormControl(
        null,
        {
          validators: [Validators.requiredTrue],
          updateOn: 'change'
        });

      this.form.addControl('file', fileControl);
      this.form.addControl('agree', agreeControl);
      this.form.addControl('fileSrc', new FormControl(''));

    }

    /**
     * Return true if form is invalid, false otherwise.
     */
    get invalid() {
      return this.form.invalid;
    }

    handleFileChange(event: Event) {
      const target = event.target as HTMLInputElement;
      const files = target.files as FileList;
      if (files.length > 0) {
        this.form.patchValue({
          fileSrc: files[0]
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
        this.status = 'pending';
        const formData = new FormData();
        formData.append('file', this.form.get('fileSrc').value);

        const result = await this.backend.restore(formData);
        if ( result.ok )
        {
          this.form.reset();
          this.status = 'ok';
        }
        else {
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
