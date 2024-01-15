import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidatorsService} from "../../../shared/services/validators.service";

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

  constructor(private formBuilder: FormBuilder,
              private validator: ValidatorsService) {
  }

  public onSave(): void {
    if (this.myBasicForm.invalid) return;

    console.log(this.myBasicForm.value);
    this.myBasicForm.reset({price: 0, stock: 0});
  }

  public isValidField(field: string): boolean | null {
    return this.validator.isValidField(this.myBasicForm, field);
  }

  public validateErrorMessages(field: string) {
    return this.validator.getFieldError(this.myBasicForm, field)
  }
}
