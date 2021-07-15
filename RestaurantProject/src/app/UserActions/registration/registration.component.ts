import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DataService } from '../../Service/data.service'
import { registrationForm } from '../../Models/registrationForm'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  constructor(private FormBuilder: FormBuilder, private dataService: DataService) { }
  registrationModel: FormGroup;
  url: string = 'https://localhost:44366/api/UserRegistration/Register'


  formVal;
  ngOnInit() {
    this.registrationForm();
  }

  registrationForm() {

    this.registrationModel = this.FormBuilder.group
      ({
        UserName: ['', Validators.required],
        FullName: ['', Validators.required],
        Email: ['', [Validators.required, Validators.email]],
        //nested form group for password
        Passwords: this.FormBuilder.group({
          Password: ['', [Validators.required, Validators.minLength(4)]],
          ConfirmPassword: ['', [Validators.required, Validators.minLength(4)]]
        }, {
          validator: this.comparePasswords
        })
      });
  }
  comparePasswords(fb: FormGroup) {
    let confirmPassword = fb.get('ConfirmPassword');
    if (confirmPassword.errors == null || 'passwordsMustMatch' in confirmPassword.errors) {
      if (fb.get('Password').value != confirmPassword.value)
        confirmPassword.setErrors({ passwordsMustMatch: true });

      else
        confirmPassword.setErrors(null);

    }
  }

  CreateUser(formVal, url) {

    return this.dataService.userRegistration(this.url, formVal).toPromise()
      .then(res => {
        return res;
      });
  }

  SubmitForm() {
    this.formVal = {
      UserName: this.registrationModel.value.UserName,
      FullName: this.registrationModel.value.FullName,
      Email: this.registrationModel.value.Email,
      Password: this.registrationModel.value.Passwords.Password

    }

    this.CreateUser(this.formVal, this.url).then(
      (res: any) => {
        if (res.succeeded) {
          alert("user was created")
          this.registrationModel.reset()
        }
      },
      err => console.log(err))
  }
}
