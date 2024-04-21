import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-date-input',
  template: `
    <mat-form-field>
      <mat-label for="dateNaissance">Date Naissance</mat-label>
     <input matInput [matDatepicker]="picker" readonly 
       [ngModel]="value | removeTime"
       (ngModelChange)="value = $event" name="dateNaissance" id="dateNaissance">

      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker ></mat-datepicker>
    </mat-form-field>
  `,
  styleUrls: ['./custom-date-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDateInputComponent),
      multi: true
    }
  ]
})
export class CustomDateInputComponent implements ControlValueAccessor {

  value: any;

  constructor() { }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}
}
import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
  name: 'removeTime'
})
export class RemoveTimePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    return value.split('T')[0]; // Split at 'T' and take the first part (date)
  }
}
