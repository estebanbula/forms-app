import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidatorsService} from "../../../shared/services/validators.service";

interface Person {
  gender: string,
  wantNotifications: boolean
}

@Component({
  templateUrl: './switches-page.component.html',
  styles: []
})
export class SwitchesPageComponent implements OnInit {

  public mySwitchForm: FormGroup = this.formBuilder.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue],
  })

  public person: Person = {
    gender: 'M',
    wantNotifications: false
  }

  constructor(private formBuilder: FormBuilder,
              private validator: ValidatorsService) {
  }

  ngOnInit(): void {
    this.mySwitchForm.reset(this.person);
  }

  public isValidField(field: string): boolean | null {
    return this.validator.isValidField(this.mySwitchForm, field);
  }

  public onSave(): void {
    if (this.mySwitchForm.invalid) {
      this.mySwitchForm.markAllAsTouched();
      return;
    }

    const {termsAndConditions, ...newPerson} = this.mySwitchForm.value;

    this.person = newPerson;
    console.log(this.person)
    console.log(this.mySwitchForm.value)
  }

}
