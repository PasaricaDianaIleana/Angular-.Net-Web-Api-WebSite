import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {registrationForm} from  '../Module/registrationForm'
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
return this.http.post(url,data,{headers:this.headers})
}
 

}
