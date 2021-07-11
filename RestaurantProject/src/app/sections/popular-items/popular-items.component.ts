import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-popular-items',
  templateUrl: './popular-items.component.html',
  styleUrls: ['./popular-items.component.css']
})
export class PopularItemsComponent implements OnInit {
  url: string = 'https://localhost:44366/api/Category';
  itemsUrl: string = 'https://localhost:44366/api/Restaurant/ByCategory/'
  response: any;
  prod: any
  constructor(private router: Router, private _dataService: DataService) { }

  ngOnInit() {
    this.GetCategories();
  }
  async Buttons(value: string) {
    await this._dataService.GetMenuItemsById(this.itemsUrl + value).subscribe(
      data => {
        this.prod = this.SplitResult(data, 3);
        //  console.log(data)
        //  console.log(this.prod)
      });
  }
  redirectToFullMenu() {
    this.router.navigate(['/menu'])
  }
  async GetCategories() {
    await this._dataService.GetCategories(this.url).toPromise().then(res => {
      this.response = res;
      // console.log(res)
    })
  }
  SplitResult(array, size) {
    let results = [];
    while (array.length) {
      results.push(array.splice(0, size));
    }
    return results;
  }
}
