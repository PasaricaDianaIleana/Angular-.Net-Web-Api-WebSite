import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectDateComponent } from 'src/app/UserActions/select-date/select-date.component';
import { FormGroup, FormBuilder, Validators, RequiredValidator } from '@angular/forms';
@Component({
  selector: 'app-rezervare',
  templateUrl: './rezervare.component.html',
  styleUrls: ['./rezervare.component.css']
})
export class RezervareComponent implements OnInit {

  constructor(private dialog: MatDialog, private fb: FormBuilder) { }
  reservationForm: FormGroup;
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
    console.log(this.reservationForm.value)
  }
  OpenPopup() {

    this.dialog.open(SelectDateComponent, {
      height: '700px',
      width: '700px'
    });

  }
}


