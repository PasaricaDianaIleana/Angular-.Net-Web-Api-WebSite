import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Service/data.service'
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-select-reservation',
  templateUrl: './select-reservation.component.html',
  styleUrls: ['./select-reservation.component.css']
})
export class SelectReservationComponent implements OnInit {
  receivedData: any
  destroy = new Subject();
  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.getFormData()
  }
  async getFormData() {
    this.data.share.pipe(takeUntil(this.destroy)).subscribe(
      data => (
        console.log(data),
        this.receivedData = data),
      error => console.error(error)

    );

  }
}