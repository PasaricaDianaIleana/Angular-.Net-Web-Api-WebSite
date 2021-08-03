import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/Service/data.service';
@Component({
  selector: 'app-update-reservation',
  templateUrl: './update-reservation.component.html',
  styleUrls: ['./update-reservation.component.css']
})
export class UpdateReservationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private _dataService: DataService) { }
  baseURL: string = 'https://localhost:44366/api/Reservation/data/';
  public editReservation: FormGroup;
  ngOnInit(): void {
    this.GetReservationFields();
    this.BuildForm();
  }
  GetReservationFields() {
    this._dataService.GetReservationById(this.baseURL + this.data.id).subscribe(
      res => {
        this.EditInput(res);
      },
      (err) => console.log(err)
    )
  }
  BuildForm() {
    this.editReservation = this.fb.group({
      date: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      guests: ['', [Validators.required, Validators.min(1)]],
      hour: ['', [Validators.required, Validators.min(8), Validators.max(22)]],
      phone: ['', [Validators.required, Validators.max(12)]]
    })
  }
  onSubmit() {
    console.log(this.editReservation.value)
  }
  EditInput(data: any) {
    console.log(data)
    this.editReservation.setValue({
      date: [data.date],
      email: [data.email],
      guests: [data.guestsNr],
      hour: [data.hour],
      phone: [data.phoneNumber]
    })

  }
}
