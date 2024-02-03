import {Injectable} from '@angular/core';
import {AbstractControl, Form, FormArray, FormControl, FormGroup, ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public static firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public static emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public cantBeStrider(control: FormControl): object | null {

    const value: string = control.value.trim().toLowerCase();
    if (value === 'strider') {
      return {
        isStrider: true,
      }
    }
    return null;
  }

  public isValidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors &&
      form.controls[field].touched;
  }

  public isValidFieldArray(formArray: FormArray, index: number): boolean | null {
    return formArray.controls[index].invalid &&
      formArray.controls[index].touched;
  }

  public getFieldError(form: FormGroup, field: string): string | null {
    if (!form.controls[field]) return null;

    const errors = form.controls[field].errors || {};

    for (let error of Object.keys(errors)) {
      switch (error) {
        case 'required':
          return 'This field is required.';
        case 'minlength':
          return `This field must have at least ${errors['minlength'].requiredLength} characters.`;
        case 'emailTaken':
          return 'The selected email is already taken';
      }
    }

    return null;
  }

  public areTwoFieldsEquals(field1: string, field2: string) {
    return (formGroup: AbstractControl) : ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({notEqual: true});
        return {notEqual: true}
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    }
  }
}
