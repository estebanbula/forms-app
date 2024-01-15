import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ValidatorsService} from "../../../shared/services/validators.service";

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

  constructor(private formBuilder: FormBuilder,
              private validator: ValidatorsService) {
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
    return this.validator.isValidField(this.myDynamicForm, field);
  }

  public isValidFieldArray(formArray: FormArray, index: number): boolean | null {
    return this.validator.isValidFieldArray(formArray, index);
  }

  public getFieldError(field: string): string | null {
    return this.validator.getFieldError(this.myDynamicForm, field);
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
