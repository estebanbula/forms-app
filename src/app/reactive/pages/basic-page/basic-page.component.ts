import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  templateUrl: './basic-page.component.html',
  styles: []
})
export class BasicPageComponent implements OnInit {

  ngOnInit(): void {
    this.myBasicForm.reset({
      name: '',
      price: 0,
      stock: 0
    })
  }

  public myBasicForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)], []],
    price: [0, [Validators.required, Validators.minLength(0)], []],
    stock: [0, [Validators.required, Validators.minLength(0)], []],
  });

  constructor(private formBuilder: FormBuilder) {
  }

  public onSave(): void {
    if (this.myBasicForm.invalid) return;

    console.log(this.myBasicForm.value);
    this.myBasicForm.reset({price: 0, stock: 0});
  }

  public isValidField(field: string): boolean | null {
    return this.myBasicForm.controls[field].errors &&
      this.myBasicForm.controls[field].touched;
  }

  public getFieldError(field: string): string | null {
    if (!this.myBasicForm.controls[field]) return null;

    const errors = this.myBasicForm.controls[field].errors || {};

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
}
