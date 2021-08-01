import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private router: Router, private _dataService: DataService) { }
  baseURL: string = 'https://localhost:44366/api';
  userDetails;
  reservationList;
  ngOnInit(): void {
    this.GetUserProfile();
  }
  LogOut() {
    this._dataService.logout();
    this.router.navigate(['/home'])
  }
  async GetUserProfile() {
    await this._dataService.getUserProfile(this.baseURL + '/UserRegistration/UserProfile').subscribe(
      res => {
        this.userDetails = res;
        this.GetReservations(this.userDetails.userId)
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )

  }
  async GetReservations(userId: string) {
    this._dataService.GetUserReservation(this.baseURL + '/Reservation/User/' + userId).subscribe(
      (res) => {
        this.reservationList = res;
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }
}
