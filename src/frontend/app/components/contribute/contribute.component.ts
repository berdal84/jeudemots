import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BackendService } from 'src/frontend/app/services/backend.service';
import { DatePipe } from '@angular/common';
import { MailSubmission } from 'src/frontend/app/models/mail-submission.model';
import { Joke } from 'src/frontend/app/models/joke.model';

enum Status {
  IDLE,
  ERROR,
  SUCCESS
}

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.css']
})
export class ContributeComponent implements OnInit {

    Status = Status; // expose to html

    status: Status;
    /** main form group */
    contributeForm: FormGroup;
    /** display form errors */
    displayErrors: boolean;

    constructor( private jokeService: BackendService) {}

    ngOnInit() {
      this.displayErrors  = false;
      this.status         = Status.IDLE;
      this.contributeForm = new FormGroup({});

      const categoryControl = new FormControl(
        null,
        {
          validators: [Validators.maxLength(20), Validators.required],
          updateOn: 'change'
        });
      this.contributeForm.addControl('category', categoryControl);

      const textControl = new FormControl(null, {
        validators: [
          Validators.required,
          Validators.maxLength(250),
          Validators.minLength(5)],
        updateOn: 'change'
      });
      this.contributeForm.addControl('text', textControl);

      const authorControl = new FormControl(
        null,
        {
          validators: Validators.required,
          updateOn: 'change'
        });        
      this.contributeForm.addControl('author', authorControl);

      const acceptTermsControl = new FormControl(
        null,
        {
          validators: Validators.requiredTrue,
          updateOn: 'change'
        });
      this.contributeForm.addControl('acceptTerms', acceptTermsControl);

    }

    /**
     * Return true if form is invalid, false otherwise.
     */
    get invalid() {
      return this.contributeForm.invalid;
    }

    /**
     * Submit form content only if form is valid
     */
    async onSubmit()
    {      
      this.displayErrors = this.contributeForm.invalid;
      if ( !this.contributeForm.invalid)
      {
        const joke: Joke =  {
            category: this.contributeForm.get( 'category' ).value,
            text:     this.contributeForm.get( 'text' ).value,
            author:   this.contributeForm.get( 'author' ).value
          };

        const result = await this.jokeService.create(joke);
        if( result ) 
        {
          this.contributeForm.reset();
          this.status = Status.SUCCESS;
        }
      }
    }

    /**
     * Reset form
     */
    onReset() {
      this.status = Status.IDLE;
      this.contributeForm.reset();
    }

    /**
     * Shortcut to this.contributeForm.controls
     */
    get controls() {
      return this.contributeForm.controls;
    }
}