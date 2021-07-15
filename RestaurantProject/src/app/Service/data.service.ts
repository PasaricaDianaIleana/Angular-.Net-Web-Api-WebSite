import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { registrationForm } from '../Models/registrationForm';
import { User } from '../Models/login'
import { Category } from '../Models/Category';
import { reservation } from '../Models/reservation'
import { MenuItem } from '../Models/MenuItem';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private headers: HttpHeaders;
  public loggedIn = false;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': '*'
    })
  }
  private shareData = new BehaviorSubject<string>('')
  public share = this.shareData.asObservable();

  sendData(data: string) {
    this.shareData.next(data)
  }

  userRegistration(url: string, data: registrationForm) {
    return this.http.post(url, data, { headers: this.headers });
  }
  userLogin(url: string, data: User): Observable<User> {
    this.loggedIn = true;
    return this.http.post<User>(url, data, { headers: this.headers });


  }
  GetCategories(url: string): Observable<Category> {
    return this.http.get<Category>(url, { headers: this.headers });
  }
  GetAllItems(url: string): Observable<MenuItem> {
    return this.http.get<MenuItem>(url, { headers: this.headers })
  }
  GetMenuItemsById(url: string): Observable<MenuItem> {
    return this.http.get<MenuItem>(url, { headers: this.headers });
  }
  AddReservation(url: string, data: reservation): Observable<reservation> {
    return this.http.post<reservation>(url, data, { headers: this.headers })
  }

}
