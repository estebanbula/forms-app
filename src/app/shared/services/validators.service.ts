import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

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
}
