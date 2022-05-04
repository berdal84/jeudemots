import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { JokeService } from 'src/app/services/joke.service';
import { DatePipe } from '@angular/common';
import { MailSubmission } from 'src/app/models/mail-submission.model';
import { Joke } from 'src/app/models/joke.model';

enum Status {
  IDLE,
  ERROR,
  SUCCESS
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    Status = Status; // expose to html

    status: Status;
    /** main form group */
    form: FormGroup;
    /** display form errors */
    displayErrors: boolean;

    constructor( private jokeService: JokeService) {}

    ngOnInit() {
      this.displayErrors  = false;
      this.status         = Status.IDLE;
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
          validators: [Validators.required],
          updateOn: 'change'
        });

      this.form.addControl('file', fileControl);
      this.form.addControl('agree', agreeControl);
      this.form.addControl('fileSrc', new FormControl());

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
      if ( !this.form.invalid)
      {
        
        const formData = new FormData();
        formData.append('file', this.form.get('fileSrc').value);
      
        const result = await this.jokeService.createArray(formData);
        if( result ) 
        {
          this.form.reset();
          this.status = Status.SUCCESS;
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