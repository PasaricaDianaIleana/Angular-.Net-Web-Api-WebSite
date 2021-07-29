import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private router: Router, private _dataService: DataService) { }

  ngOnInit(): void {
  }
  LogOut() {
    this._dataService.logout();
    this.router.navigate(['/home'])
  }
}
