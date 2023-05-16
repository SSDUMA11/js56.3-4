import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form!: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]+$')]),
      email: new FormControl('', [Validators.required, Validators.email], [this.checkEmailAsync()]),
      password: new FormControl('', [Validators.required, Validators.minLength(7)]),
    });
  }

  checkEmailAsync(): AsyncValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      const emails = data.map((user: any) => user.email);
      
      if (emails.includes(control.value)) {
        control.markAsTouched();
        return { uniqEmail: true };
      } else {
        return null;
      }
    };
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
