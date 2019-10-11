import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.css']
})
export class ContributeComponent implements OnInit {

    contributeForm: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {

      this.contributeForm = new FormGroup({});

      const categoryControl    = new FormControl(null, {validators: [ Validators.maxLength(20), Validators.required], updateOn: 'change'});
      this.contributeForm.addControl( 'category',     categoryControl );

      const textControl        = new FormControl(null, {
        validators: [
          Validators.required,
          Validators.maxLength(85),
          Validators.minLength(5) ],
        updateOn: 'change'});
      this.contributeForm.addControl( 'text',         textControl );

      const authorControl      = new FormControl(null, {validators: Validators.required, updateOn: 'change'});
      this.contributeForm.addControl( 'author',       authorControl );

      const emailControl       = new FormControl(null, {validators: Validators.email, updateOn: 'change'});
      this.contributeForm.addControl( 'email',        emailControl );

      const acceptTermsControl = new FormControl(null, {validators: Validators.requiredTrue, updateOn: 'change'});
      this.contributeForm.addControl( 'acceptTerms',  acceptTermsControl );

      this.contributeForm.valueChanges.subscribe(val => {
        this.submitted = false;
      });

    }

    get invalid() {
      return this.contributeForm.invalid;
    }
    get controls() {
      return this.contributeForm.controls;
    }

    onSubmit() {
      this.submitted = true;

      if ( !this.contributeForm.invalid) {
        const jsonAsString = JSON.stringify(this.contributeForm.value, null, 4);
        alert('Formulaire envoyé ! \n\n' + jsonAsString);
      }
    }

    onReset() {
        this.submitted = false;
        this.contributeForm.reset();
    }
}