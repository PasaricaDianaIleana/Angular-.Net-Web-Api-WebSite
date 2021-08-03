import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/Service/data.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateReservationComponent } from 'src/app/UserActions/update-reservation/update-reservation.component';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private _dataService: DataService, private dialog: MatDialog) { }
  baseURL: string = 'https://localhost:44366/api';
  userDetails;
  userLogin: Subscription
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
  ngOnDestroy() {
    if (this.userLogin) {
      this.userLogin.unsubscribe();
    }
  }
  UpdateReservation(id: number) {
    this.dialog.open(UpdateReservationComponent, {
      height: '700px',
      width: '700px',
      data: { id }
    })
  }
  DeleteReservation(id: number) {
    //  console.log(id);
    this._dataService.DeleteReservation(this.baseURL + '/Reservation/' + id).subscribe(
      () => console.log(`Reservation with id ${id} was deleted`),
      (err) => console.log(err)
    )
  }
}
