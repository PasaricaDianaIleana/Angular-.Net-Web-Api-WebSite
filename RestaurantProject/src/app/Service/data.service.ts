import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { registrationForm } from '../Models/registrationForm';
import { User } from '../Models/login'
import { Category } from '../Models/Category';
import { reservation } from '../Models/reservation'
import { MenuItem } from '../Models/MenuItem';
import { IUserProfile } from '../Models/UserProfile'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private headers: HttpHeaders;


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
    return this.http.post<User>(url, data, { headers: this.headers });
  }
  isAuthenticated() {
    if (localStorage.getItem("Token")) {
      return true;
    }
    else {
      return false;
    }
  }
  logout() {
    localStorage.removeItem("Token");
  }
  getUserProfile(url: string): Observable<IUserProfile> {
    var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("Token") })
    return this.http.get<IUserProfile>(url, { headers: tokenHeader });
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
  GetUserReservation(url: string): Observable<reservation> {
    return this.http.get<reservation>(url, { headers: this.headers })
  }
  DeleteReservation(url: string): Observable<void> {
    return this.http.delete<void>(url, { headers: this.headers })
  }
  AddReservation(url: string, data: reservation): Observable<reservation> {
    return this.http.post<reservation>(url, data, { headers: this.headers })
  }
  CheckReservation(url: string): Observable<reservation> {
    return this.http.get<reservation>(url, { headers: this.headers })
  }
  GetReservation(url: string): Observable<reservation> {
    return this.http.get<reservation>(url, { headers: this.headers })
  }
  GetReservationById(url: string): Observable<reservation> {
    return this.http.get<reservation>(url, { headers: this.headers })
  }
}
