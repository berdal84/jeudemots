import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { JokeService } from 'src/app/services/joke.service';
import { DatePipe } from '@angular/common';
import { MailSubmission } from 'src/app/models/mail-submission.model';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.css']
})
export class ContributeComponent implements OnInit {

    /** main form group */
    contributeForm: FormGroup;
    /** flag to avoid multiple submission */
    submitted: boolean;

    constructor( private jokeService: JokeService) {}

    ngOnInit() {
      this.submitted = false;
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
          Validators.maxLength(85),
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

      const emailControl = new FormControl(
        null,
        {
          validators: Validators.email,
          updateOn: 'change'
        });
      this.contributeForm.addControl('email', emailControl);

      const acceptTermsControl = new FormControl(
        null,
        {
          validators: Validators.requiredTrue,
          updateOn: 'change'
        });
      this.contributeForm.addControl('acceptTerms', acceptTermsControl);

      this.contributeForm.valueChanges.subscribe(val => {
        this.submitted = false;
      });

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
    onSubmit() {      

      if ( !this.contributeForm.invalid) {

        this.submitted = true;
        const datePipe = new DatePipe('en-US');

        const submission: MailSubmission = {
          from: this.contributeForm.get( 'email' ).value,
          joke: {
            category: this.contributeForm.get( 'category' ).value,
            text:     this.contributeForm.get( 'text' ).value,
            author:   this.contributeForm.get( 'author' ).value,
            date:     datePipe.transform(new Date(), 'yyyy-MM-dd'),
            visible:  false
          }
        };
        this.jokeService.sendJokeByMail(submission);
      }
    }

    /**
     * Reset form
     */
    onReset() {
        this.submitted = false;
        this.contributeForm.reset();
    }

    /**
     * Shortcut to this.contributeForm.controls
     */
    get controls() {
      return this.contributeForm.controls;
    }
}