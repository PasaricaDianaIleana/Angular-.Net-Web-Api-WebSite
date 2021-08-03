import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectDateComponent } from 'src/app/UserActions/select-date/select-date.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/Service/data.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rezervare',
  templateUrl: './rezervare.component.html',
  styleUrls: ['./rezervare.component.css']
})
export class RezervareComponent implements OnInit, OnDestroy {

  constructor(private dialog: MatDialog, private router: Router, private fb: FormBuilder, private dataService: DataService) { }
  public reservationForm: FormGroup;
  public recivedId: string;
  public receivedData: string
  private destroy = new Subject();
  public formData;
  private formSub: Subscription;
  private dialogSub: Subscription;
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

    if (this.dataService.isAuthenticated()) {
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
      this.dataService.AddReservation(this.url, this.formData).subscribe(
        (data) => {
          return data;
        })
    }
    else {
      this.router.navigate(['/Login'])
    }
  }
  OpenPopup() {

    let data = this.dialog.open(SelectDateComponent, {
      height: '700px',
      width: '700px',

    });
    return data.afterClosed().subscribe((res) => {
      console.log(res.value)
      this.UpdateFormInputs(res)
    })
  }

  getUserId(): string {
    this.dataService.share.pipe(takeUntil(this.destroy)).subscribe(
      data => (this.recivedId = data),
      error => console.error(error)
    )
    return this.recivedId;
  }
  UpdateFormInputs(values) {
    console.log(values)

    this.reservationForm.patchValue({
      date: [values.value.selecteDay],
      guestsNr: [values.value.guestNr],
      time: [values.value.selectHour]
    })
  }
  ngOnDestroy() {
    if (this.dialogSub) {
      this.dialogSub.unsubscribe();
    }
    if (this.formSub) {
      this.formSub.unsubscribe();
    }
  }
}


