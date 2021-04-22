import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
private formContent=new BehaviorSubject<string>('')

public share=this.formContent.asObservable();

sendFormDate(data:string){
  this.formContent.next(data)
}

  constructor() { }

}
