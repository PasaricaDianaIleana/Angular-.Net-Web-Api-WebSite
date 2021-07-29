import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  url: string = 'https://localhost:44366/api/Category';
  itemsUrl: string = 'https://localhost:44366/api/Restaurant/ByCategory/'
  response: any;
  items: any;
  categories: Subscription;
  menuItems: Subscription;
  constructor(private dataServie: DataService) { }

  ngOnInit() {
    this.getCategories();
    this.GetMenuItems('1');

  }
  async getCategories() {
    await this.dataServie.GetCategories(this.url).subscribe(
      (data) => {
        this.response = data;
        console.log(this.response)
      })
  }
  GetMenuItems(categoryId: string) {
    // alert(categoryId)
    this.dataServie.GetMenuItemsById(this.itemsUrl + categoryId).subscribe(
      res => {
        this.items = res;
        console.log(this.items)
      }
    )
  }
  ngOnDestroy() {
    if (this.categories) {
      this.categories.unsubscribe();
    }
    if (this.menuItems) {
      this.menuItems.unsubscribe();
    }
  }
}
