import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {registrationForm} from  '../Models/registrationForm';
import {User} from '../Models/login'
@Injectable({
  providedIn: 'root'
})
export class DataService {

private headers:HttpHeaders;


  constructor( private http:HttpClient) { 
    this.headers=new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': '*'
    })
  }
private formContent=new BehaviorSubject<string>('')

public share=this.formContent.asObservable();

sendFormDate(data:string){
  this.formContent.next(data)
}

userRegistration(url:string,data:registrationForm){
return this.http.post(url,data,{headers:this.headers});
}
 userLogin(url:string,data:User):Observable<User>{
   return this.http.post<User>(url,data,{headers:this.headers});
 }

}
