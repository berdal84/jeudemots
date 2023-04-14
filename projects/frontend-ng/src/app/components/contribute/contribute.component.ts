import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators, UntypedFormControl } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { MailSubmission, Joke } from 'frontend-common';

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
    contributeForm: UntypedFormGroup;
    /** display form errors */
    displayErrors: boolean;

    constructor( private jokeService: BackendService) {}

    ngOnInit() {
      this.displayErrors  = false;
      this.status         = Status.IDLE;
      this.contributeForm = new UntypedFormGroup({});

      const categoryControl = new UntypedFormControl(
        null,
        {
          validators: [Validators.maxLength(20), Validators.required],
          updateOn: 'change'
        });
      this.contributeForm.addControl('category', categoryControl);

      const textControl = new UntypedFormControl(null, {
        validators: [
          Validators.required,
          Validators.maxLength(250),
          Validators.minLength(5)],
        updateOn: 'change'
      });
      this.contributeForm.addControl('text', textControl);

      const authorControl = new UntypedFormControl(
        null,
        {
          validators: Validators.required,
          updateOn: 'change'
        });        
      this.contributeForm.addControl('author', authorControl);

      const acceptTermsControl = new UntypedFormControl(
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