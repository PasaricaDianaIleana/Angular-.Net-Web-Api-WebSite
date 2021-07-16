import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectDateComponent } from 'src/app/UserActions/select-date/select-date.component';
import { FormGroup, FormBuilder, Validators, RequiredValidator } from '@angular/forms';
import { DataService } from 'src/app/Service/data.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-rezervare',
  templateUrl: './rezervare.component.html',
  styleUrls: ['./rezervare.component.css']
})
export class RezervareComponent implements OnInit {

  constructor(private dialog: MatDialog, private router: Router, private fb: FormBuilder, private dataService: DataService) { }
  reservationForm: FormGroup;
  recivedId: string;
  receivedData: string
  destroy = new Subject();
  formData;
  url: string = "https://localhost:44366/api/Reservation"
  ngOnInit() {

    this.reservationForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      date: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      guestsNr: ['', Validators.required],
      time: ['', Validators.required]

    })
  }

  onSubmit(): void {

    if (this.dataService.loggedIn == true) {
      this.formData = {
        fullName: this.reservationForm.value.name,
        phoneNumber: this.reservationForm.value.phone,
        date: this.reservationForm.value.date,
        email: this.reservationForm.value.email,
        guestsNr: this.reservationForm.value.guestsNr,
        hour: this.reservationForm.value.time,
        userId: this.getUserId()
      }
      console.log(this.formData)
      this.dataService.AddReservation(this.url, this.formData).toPromise()
        .then((data) => {
          return data;
        })
    }
    else {
      this.router.navigate(['/Login'])
    }
  }
  OpenPopup() {

    this.dialog.open(SelectDateComponent, {
      height: '700px',
      width: '700px'
    });

  }
  AddReservation(formData, url: string) {
    return
  }
  getUserId(): string {
    this.dataService.share.pipe(takeUntil(this.destroy)).subscribe(
      data => (this.recivedId = data),
      error => console.error(error)
    )
    return this.recivedId;
  }

}


