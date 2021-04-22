import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  
  constructor(private FormBuilder:FormBuilder) { }
  registrationModel:FormGroup;

  AddUser(){
    console.log(this.registrationModel.value)
  }
 
  ngOnInit() {
    this.registrationForm();
  }

  registrationForm(){

    this.registrationModel=this.FormBuilder.group
    ({
      UserName:[''],
      FullName:[''],
      Email:[''],
      //nested form group for password
      Passwords:this.FormBuilder.group({
        Password:[''],
        ConfirmPassword:['']
      })
    });
  }
}
