import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public album = [];
  constructor(private _lightbox: Lightbox){
    //album fill
    this.album.push({
      src: "/assets/images/thin-crust1.jpg",
      caption: "Chicago Thin-Crust Pizza",
      thumb: "/assets/images/thin-crust1.jpg"
    });
    this.album.push({
      src: "/assets/images/buffalo-wings1.jpg",
      caption: "Hot Buffalo Wings",
      thumb: "/assets/images/buffalo-wings1.jpg"
    });
    this.album.push({
      src: "/assets/images/italian-sub.jpg",
      caption: "Oven-baked Italian Sub",
      thumb: "/assets/images/italian-sub.jpg"
    });
    this.album.push({
      src: "/assets/images/mostaccioli.jpg",
      caption: "Baked Mostaccioli",
      thumb: "/assets/images/mostaccioli.jpg"
    });
    this.album.push({
      src: "/assets/images/sicilian-pizza.jpg",
      caption: "Sicilian Pizza",
      thumb: "/assets/images/sicilian-pizza.jpg"
    });
    this.album.push({
      src: "/assets/images/salad.jpg",
      caption: "House Salad",
      thumb: "/assets/images/salad.jpg"
    });
   }
   
  ngOnInit(): void {
  }

  open(index: number = 0): void {
    this._lightbox.open(this.album, index);
  }
}
