import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../Service/data.service'
import { } from '../../Models/login'
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) { }
  url: string = 'https://localhost:44366/api/UserRegistration/Login';
  loginForm: FormGroup;
  formValues;
  ngOnInit() {

    this.loginForm = this.fb.group({
      UserName: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  login() {
    this.formValues = {
      Username: this.loginForm.value.UserName,
      Password: this.loginForm.value.Password
    }

    this.dataService.userLogin(this.url, this.formValues).toPromise().then(
      (res: any) => {

        localStorage.setItem('Token', res.writeToken);
        var data = localStorage.getItem('Token')
        console.log(data)
        this.dataService.sendData(res.id);
        this.router.navigateByUrl('/home')
      },
      err => {
        if (err.status == 400) {
          alert("Incorrect username or password")
        } else {
          console.log(err);

        }
      }
    )
  }

}
