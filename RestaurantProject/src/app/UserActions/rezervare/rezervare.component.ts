import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { SelectDateComponent } from 'src/app/UserActions/select-date/select-date.component';
@Component({
  selector: 'app-rezervare',
  templateUrl: './rezervare.component.html',
  styleUrls: ['./rezervare.component.css']
})
export class RezervareComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit() {
    this.OpenPopup();
  }
OpenPopup(){

this.dialog.open(SelectDateComponent,{
  height:'700px',
  width:'700px'
});

}
}


