import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  loginForm:FormGroup;

  ngOnInit() {

    this.loginForm=this.fb.group({
      UserName:['',[Validators.required]],
      Password:['',[Validators.required,Validators.minLength(4)]]
    })
  }

  login(){
    
  }

}
