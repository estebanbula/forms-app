import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidatorsService} from "../../../shared/services/validators.service";

@Component({
  templateUrl: './register-page.component.html',
  styles: []
})
export class RegisterPageComponent {

  public loginForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern(ValidatorsService.firstNameAndLastnamePattern)]],
    email: ['', [Validators.required, Validators.pattern(ValidatorsService.emailPattern)]],
    username: ['', [Validators.required, Validators.minLength(4), this.validatorsService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmedPassword: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder,
              private validatorsService: ValidatorsService) {
  }

  public isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.loginForm, field);
  }

  public onSave(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    console.log(this.loginForm.value);
  }

}
