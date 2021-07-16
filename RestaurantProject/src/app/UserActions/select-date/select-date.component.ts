import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms'
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog'
import { SelectReservationComponent } from '../select-reservation/select-reservation.component'
import { DataService } from '../../Service/data.service'
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';
@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.css']
})
export class SelectDateComponent implements OnInit {
  prevDate: boolean = false;
  selectDate: FormGroup;
  receivedData: string
  destroy = new Subject();
  checkDate: boolean = true;
  constructor(private form: FormBuilder, private dialog: MatDialog, private data: DataService, private router: Router) { }

  currentDate = new Date(Date.now())
  currentNumber: number = 2;
  currentTime = new Date().getHours() + ':' + new Date().getMinutes()
  url: string = 'https://localhost:44366/api/Reservation'

  ngOnInit(): void {
    this.selectDate = this.form.group({
      selectDay: [formatDate(this.currentDate, 'yyyy-MM-dd', 'en')],
      guestNr: new FormControl(this.currentNumber),
      selectHour: new FormControl(this.currentTime)
    })
  }

  onSubmit() {
    //console.log(this.selectDate.value)
    this.data.sendData(this.selectDate.value)
  }

  incrementDay() {

    this.currentDate = new Date(+this.currentDate + 1 * 86400000);
    this.selectDate.patchValue({
      selectDay: [formatDate(this.currentDate, 'yyyy-MM-dd', 'en')]
    })

  }
  decrementDay() {

    this.currentDate = new Date(+this.currentDate - 1 * 86400000);
    //console.log(this.currentDate)
    if (this.currentDate > new Date(Date.now())) {
      this.selectDate.patchValue({
        selectDay: [formatDate(this.currentDate, 'yyyy-MM-dd', 'en')]
      })
    }
  }
  decrementGuests() {
    this.currentNumber -= 1;
    this.selectDate.patchValue({
      guestNr: [this.currentNumber]
    });
  }
  incrementGuests() {
    this.currentNumber += 1;
    this.selectDate.patchValue({
      guestNr: [this.currentNumber]
    });
  }
  getResevation() {

  }
  checkReservation() {
    let url = this.url + '/' + this.selectDate.value.selectDay + '/' + this.selectDate.value.selectHour + '/' + this.selectDate.value.guestNr
    this.data.CheckReservation(url).subscribe(
      (res: any) => {
        console.log(res)

        this.dialog.closeAll();

      },
      err => {
        if (err.status == 404) {
          const newDialog = this.dialog.open(SelectReservationComponent, {
            height: '700px',
            width: '700px',

          })

        } else {
          console.log(err);
        }
      }
    )





  }
}
