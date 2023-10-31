import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Input() rating: any ; // Input property to receive the rating value
  fullStars: number[];
  
  constructor() {
    this.fullStars = [];
  }

  ngOnChanges() {
    // Generate an array of full stars based on the rating value
    this.fullStars = Array(Math.floor(this.rating)).fill(0);
  }
}
