import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  rezervare() {
    this.router.navigate(['/Rezervare']);
  }
  redirectToMenu() {
    this.router.navigate(['/menu']);
  }

  cardsItems = [
    { image: '../../../assets/images/—Pngtree—breakfast porridge oat milk_5400226.png', title: 'Breakfast', description: ' Breakfast is a light morning meal typically consisting of pastries and baked goods, fruits, toast, and coffee. ' },
    { image: '../../../assets/images/lunch.png', title: 'Lunch', description: 'Lunch meal typically consisting of starters and salad,pasta. ' },
    { image: '../../../assets/images/coffee.png', title: 'Drinks', description: 'Enjoy a drink in our spacious lounge bar, is a truly enjoyable experience ' }
  ]
  cardImage = [
    { image: ' ../../../assets/images/img6.jpg' },
    { image: ' ../../../assets/images/img7.jpg' },
    { image: ' ../../../assets/images/img5.jpg' },
    { image: ' ../../../assets/images/img4.jpg' }


  ]
}
