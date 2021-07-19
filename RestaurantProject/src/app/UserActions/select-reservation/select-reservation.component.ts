import { Component, OnInit } from "@angular/core";
import { DataService } from "../../Service/data.service";
import { min, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-select-reservation",
  templateUrl: "./select-reservation.component.html",
  styleUrls: ["./select-reservation.component.css"],
})
export class SelectReservationComponent implements OnInit {
  receivedData: any;
  destroy = new Subject();
  dateFormat: Date;
  listOfData = [];
  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.getFormData();
    this.getReservation();
  }
  async getReservation() {
    this.dateFormat = new Date(this.receivedData.selectDay);
    let data = new DatePipe("en-US").transform(this.dateFormat, "dd-MM-yyyy");
    let reservedData = [];
    let newDate = this.receivedData.selectHour;
    let arr = [];
    await this.data.CheckReservation("https://localhost:44366/api/Reservation/" + data)
      .subscribe((res: any) => {
        reservedData = res;
        for (let i = 0; i < reservedData.length; i++) {
          arr.push(reservedData[i].time)
        }
        while (newDate < "23:00") {
          this.listOfData.push(newDate);
          newDate = this.AddMinutes(newDate, "30");
        }
        this.listOfData = this.listOfData.filter(item => !arr.includes(item))
        console.log(this.listOfData)
      });
  }
  getFormData() {
    this.data.share.pipe(takeUntil(this.destroy)).subscribe(
      (data) =>
        (this.receivedData = data),
      (error) => console.error(error)
    );
  }
  CheckTime(time) {
    //add 0 before single numbers less than 0 - 5=>05
    return (time < 10 ? "0" : "") + time;
  }
  AddMinutes(time, minsToAdd) {
    //split time string in two pieces- [0] hour,[1] min
    var piece = time.split(":");
    var mins = piece[0] * 60 + +piece[1] + +minsToAdd;
    return (
      this.CheckTime(((mins % (24 * 60)) / 60) | 0) +
      ":" +
      this.CheckTime(mins % 60)
    );
  }
}
