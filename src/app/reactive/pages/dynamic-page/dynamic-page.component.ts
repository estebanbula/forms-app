import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  public myDynamicForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)], []],
    favoriteGames: this.formBuilder.array([]),
  });

  constructor(private formBuilder: FormBuilder) {
  }

  public onSave(): void {
    if (this.myDynamicForm.invalid) {
      this.myDynamicForm.markAllAsTouched();
      return;
    }

    console.log(this.myDynamicForm.value);
    (this.myDynamicForm.controls['favoriteGames'] as FormArray) = this.formBuilder.array([]);
    this.myDynamicForm.reset();
  }

  get favoriteGames() {
    return this.myDynamicForm.get('favoriteGames') as FormArray;
  }

  public newFavorite: FormControl = new FormControl('', Validators.required);

  public isValidField(field: string): boolean | null {
    return this.myDynamicForm.controls[field].errors &&
      this.myDynamicForm.controls[field].touched;
  }

  public isValidFieldArray(formArray: FormArray, index: number): boolean | null {
    return formArray.controls[index].invalid &&
      formArray.controls[index].touched;
  }

  public getFieldError(field: string): string | null {
    if (!this.myDynamicForm.controls[field]) return null;

    const errors: ValidationErrors = this.myDynamicForm.controls[field].errors || {};

    for (let error of Object.keys(errors)) {
      switch (error) {
        case 'required':
          return 'This field is required.';
        case 'minlength':
          return `This field must have at least ${errors['minlength'].requiredLength} characters.`;
      }
    }

    return null;
  }

  public onDeleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  public onAddFavorite(): void {
    if (this.myDynamicForm.invalid) return;
    const newGame = this.newFavorite.value;
    this.favoriteGames.push(
      this.formBuilder.control(newGame, Validators.required)
    )
    this.newFavorite.reset();
  }

}
