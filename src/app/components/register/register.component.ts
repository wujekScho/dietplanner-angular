import { UsernameValidator } from './../../../common/validators/username.validator';
import { UserService } from './../../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl, AbstractControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form;

  constructor(fb: FormBuilder, private userService: UserService, private usernameValidator: UsernameValidator, private router: Router) {
    this.form = fb.group({
      login: new FormControl('', [Validators.required], this.isUsernameAvaliable.bind(this)),
      password: new FormControl('', [Validators.required]),
      repeatedPassword: new FormControl('', [Validators.required]),
      typeCalculate: new FormControl('calculate', Validators.required),
      caloriesNeeded: new FormControl({ value: '' }, [Validators.required, Validators.min(1000)]),
      calculateCalories: new FormGroup({
        gender: new FormControl('woman', []),
        bodyWeigth: new FormControl('', []),
        height: new FormControl('', []),
        age: new FormControl('', []),
        activityLevel: new FormControl(1.2, []),
        goal: new FormControl(0, [])
      })
    });
  }

  ngOnInit() {
    this.setValidators();
  }

  checkPasswords() {
    if (this.password.valid && this.repeatedPassword.valid) {
      if (this.password.value !== this.repeatedPassword.value) {
        this.repeatedPassword.setErrors({ diferentPasswords: true });
      }
    }
  }

  isUsernameAvaliable(control: AbstractControl) {
    return this.usernameValidator.isUsernameAvaliable(control.value).pipe(
      map((response: boolean) => response ? null : { usernameTaken: true })
    )
  }

  calculate() {
    let calories = 0;
    if (this.gender.value === 'men') {
      calories = 66 + 13.7 * this.bodyWeigth.value + 5 * this.height.value - 6.76 * this.age.value;
    } else {
      calories = 665 + 9.6 * this.bodyWeigth.value + 1.8 * this.height.value - 4.7 * this.age.value;
    }
    calories = calories * this.activityLevel.value + parseInt(this.goal.value);

    this.form.controls['caloriesNeeded'].patchValue(Math.round(calories / 50) * 50);
  }

  setValidators() {
    if (this.typeCalculate.value === 'type') {
      this.bodyWeigth.setValidators(null);
      this.bodyWeigth.updateValueAndValidity();
      this.height.setValidators(null);
      this.height.updateValueAndValidity();
      this.age.setValidators(null);
      this.age.updateValueAndValidity();

    } else {
      this.bodyWeigth.setValidators([Validators.required, Validators.min(0)]);
      this.bodyWeigth.updateValueAndValidity();
      this.height.setValidators([Validators.required, Validators.min(0)]);
      this.height.updateValueAndValidity();
      this.age.setValidators([Validators.required, Validators.min(0), Validators.max(120)]);
      this.age.updateValueAndValidity();
    }
  }

  addUser() {
    let user = {
      username: this.login.value,
      password: this.password.value,
      caloriesNeeded: this.caloriesNeeded.value
    }
    this.userService.registerUser(user).subscribe();
    alert('Zarejsetrowano nowego użytkowanika! Zaloguj się');
    this.router.navigateByUrl("/login");
  }

  get login() {
    return this.form.get('login');
  }
  get password() {
    return this.form.get('password');
  }
  get repeatedPassword() {
    return this.form.get('repeatedPassword');
  }
  get caloriesNeeded() {
    return this.form.get('caloriesNeeded');
  }

  get typeCalculate() {
    return this.form.get('typeCalculate');
  }

  get isDisabled() {
    if (this.typeCalculate.value === 'type') {
      return false;
    } else {
      return true;
    }
  }

  get bodyWeigth() {
    return this.form.get('calculateCalories.bodyWeigth');
  }
  get gender() {
    return this.form.get('calculateCalories.gender');
  }
  get height() {
    return this.form.get('calculateCalories.height');
  }
  get age() {
    return this.form.get('calculateCalories.age');
  }
  get activityLevel() {
    return this.form.get('calculateCalories.activityLevel');
  }
  get goal() {
    return this.form.get('calculateCalories.goal');
  }
}
