import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-leaky',
  imports: [],
  templateUrl: './leaky.component.html',
  styleUrl: './leaky.component.scss'
})
export class LeakyComponent implements OnInit {

  // subscription : Subscription = new Subscription();
  
  ngOnInit() {
    interval(1000).subscribe(val => {
      console.log('Leaky value:', val);
    });
  }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }

}
