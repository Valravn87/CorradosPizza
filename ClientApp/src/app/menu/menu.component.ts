import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

enum menuSection {
  All,
  Apps,
  Salads,
  Pizza,
  Pasta,
  Sandwiches,
  Desserts
}


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  private _album = []; 
  public selected : menuSection;
  constructor(private _lightbox: Lightbox) { 
    //album fill
    // 0
    this._album.push({
    src: "/assets/images/buffalo-wings1.jpg",
    caption: "Hot Buffalo Wings",
    thumb: "/assets/images/buffalo-wings1.jpg"
    });
    // 1
    this._album.push({
      src: "/assets/images/deep-dish-pizza.jpg",
      caption: "Deep-Dish Pizza",
      thumb: "/assets/images/deep-dish-pizza.jpg"
    });
    // 2
    this._album.push({
      src: "/assets/images/thin-crust1.jpg",
      caption: "Chicago Thin-Crust Pizza",
      thumb: "/assets/images/thin-crust1.jpg"
    });
    // 3
    this._album.push({
      src: "/assets/images/new-york-pizza.jpg",
      caption: "New York-Style Pizza",
      thumb: "/assets/images/new-york-pizza.jpg"
    });
    // 4
    this._album.push({
      src: "/assets/images/sicilian-pizza.jpg",
      caption: "Sicilian Pizza",
      thumb: "/assets/images/sicilian-pizza.jpg"
    });
    // 5
    this._album.push({
      src: "/assets/images/st-louis-pizza.jpg",
      caption: "St. Louis-Style Pizza",
      thumb: "/assets/images/st-louis-pizza.jpg"
    });
    // 6
    this._album.push({
      src: "/assets/images/mostaccioli.jpg",
      caption: "Baked Mostaccioli",
      thumb: "/assets/images/mostaccioli.jpg"
    });
    // 7
    this._album.push({
      src: "/assets/images/italian-sub.jpg",
      caption: "&quotArturo&quot Sandwich",
      thumb: "/assets/images/italian-sub.jpg"
    });
    // 8
    this._album.push({
      src: "/assets/images/tiramisu.jpg",
      caption: "Tiramisù",
      thumb: "/assets/images/tiramisu.jpg"
    });
  }
  
  ngOnInit() {
    this.selected = menuSection.All;
  }

  showAll() {
    this.selected = menuSection.All;
  }

  showApps() {
    this.selected = menuSection.Apps;
  }

  showDesserts() {
    this.selected = menuSection.Desserts;
  }

  showPasta() {
    this.selected = menuSection.Pasta;
  }

  showPizza() {
    this.selected = menuSection.Pizza;
  }

  showSalads() {
    this.selected = menuSection.Salads;
  }

  showSandwiches() {
    this.selected = menuSection.Sandwiches;
  }

  open(index: number = 0): void {
    this._lightbox.open(this._album, index);
  }
}
