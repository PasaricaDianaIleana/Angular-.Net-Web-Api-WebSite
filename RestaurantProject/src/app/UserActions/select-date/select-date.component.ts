import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms'
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog'
import { SelectReservationComponent } from '../select-reservation/select-reservation.component'
import { DataService } from '../../Service/data.service'
@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.css']
})
export class SelectDateComponent implements OnInit {
  prevDate: boolean = false;
  selectDate: FormGroup;

  constructor(private form: FormBuilder, private dialog: MatDialog, private data: DataService) { }

  currentDate = new Date(Date.now())
  currentNumber: number = 2;
  currentTime = new Date().getHours() + ':' + new Date().getMinutes()


  ngOnInit(): void {
    this.selectDate = this.form.group({
      selectDate: [formatDate(this.currentDate, 'yyyy-MM-dd', 'en')],
      guestNr: new FormControl(this.currentNumber),
      selectHour: new FormControl(this.currentTime)
    })
  }

  onSubmit() {
    console.log(this.selectDate.value)
    this.data.sendData(this.selectDate.value)
  }

  incrementDay() {

    this.currentDate = new Date(+this.currentDate + 1 * 86400000);
    this.selectDate.patchValue({
      selectDate: [formatDate(this.currentDate, 'yyyy-MM-dd', 'en')]
    })

  }
  decrementDay() {

    this.currentDate = new Date(+this.currentDate - 1 * 86400000);
    this.selectDate.patchValue({
      selectDate: [formatDate(this.currentDate, 'yyyy-MM-dd', 'en')]
    })


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
  checkReservation() {
    const newDialog = this.dialog.open(SelectReservationComponent, {
      height: '700px',
      width: '700px'
    })
  }
}
