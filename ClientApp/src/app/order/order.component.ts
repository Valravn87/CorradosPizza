import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPizza, Pizza, Size} from './pizza';
import $ from 'jquery';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public styleChoices = ["Chicago Thin-Crust", "New York Hand-Tossed", 
    "Sicilian Square", "Chicago Deep-Dish", "St. Louis Thin-Crust"];
  public pizzas: IPizza[] = [
    {
      "style": "Chicago Thin-Crust",
      "size": 2,
      "toppings": ["Italian Sausage", "Green Peppers", "Canadian Bacon"]
    }
  ];
  public toppingChoices = ["Pepperoni",	"Ham",	"Jalapeños", "Anchovies",
    "Italian Sausage",	"Black Olives",	"Onions",	"Grilled Chicken",
    "Bacon",	"Green Peppers",	"Tomatoes",	"Pineapple",
    "Canadian Bacon",	"Banana Peppers",	"Mushrooms"];
  public piz: Pizza;
  public delivery: boolean = null;
  public checkout: boolean = false;
  public billingInfo: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.pizzas = [];
    this.billingInfo = this.fb.group(
      {
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        address1: [null, Validators.required],
        address2: [null],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zip: [null, Validators.required],
        phoneNum: [null, Validators.required],
        cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
        cardType: [null, Validators.required],
        cardNum: [null, Validators.required],
        cardExpMonth: [null, Validators.required],
        cardExpYear: [null, Validators.required]
      })
  }

  sizeChoices() : Size[] {
    let sizes: Size[];
    if (this.piz.style === "Sicilian Square") sizes =  [Size.Small, Size.Medium, Size.Large];
    else if (this.piz.style === "New York Hand-Tossed") sizes = [Size.XLarge, Size.Huge];
    else if (this.piz.style === "Chicago Deep-Dish") sizes = [Size.Small, Size.Large];
    else sizes =  [Size.Small, Size.Medium, Size.Large, Size.XLarge];
    return sizes;
  }

  getSize(size: Size, style?: String): string{
    switch(size){
      case Size.Small:
          return (style === "Sicilian Square")? "9 x 9\" Small" : "10\" Small";
      case Size.Medium:
          return (style === "Sicilian Square")? "13 x 9\" Medium" : "12\" Medium";
      case Size.Large:
          return (style === "Sicilian Square")? "15 x 12\" Large" : "14\" Large";
      case Size.XLarge:
          return "16\" X-Large";
      case Size.Huge:
          return "20\" Yooge";
      default:
          return "NO PIZZA FOR YOU!!!!!" // when size is undefined
    }    
  }

  getToppings(pizza: IPizza): string {
    return pizza.toppings.length > 0 ? pizza.toppings.join(", ") : "Cheese";
  }

  getPrice(pizza: IPizza): number {
    return this.basePrice(pizza) + (this.toppingPrice(pizza) * pizza.toppings.length);
  }
  
  toppingPrice(pizza: IPizza): number {
    if (pizza.style ===  "Chicago Deep-Dish"){
      switch(pizza.size){
          case Size.Small:
              return 1.5;
          case Size.Large:
              return 2.5;
          default:
              return 50; // no other size should be accessible for this style
      }
  } else{ // any other style
      switch(pizza.size){
          case Size.Small:
              return 0.75;
          case Size.Medium:
              return 1;
          case Size.Large:
              return 1.5;
          case Size.XLarge:
              return 2;
          case Size.Huge:
              return 3;
      }
  }
  }

  basePrice(pizza: IPizza): number {
    if (pizza.style === "Chicago Deep-Dish"){
        switch(pizza.size){
            case Size.Small:
                return 11.95;
            case Size.Large:
                return 16.95;
        }
    } 
    else if (pizza.style === "Sicilian Square") { // sicilian
        switch(pizza.size){
          case Size.Small:
              return 9.95;
          case Size.Medium:
              return 10.95;
          case Size.Large:
              return 13.45;
        }
      }
      else {
        switch(pizza.size){
            case Size.Small:
                return 8.95;
            case Size.Medium:
                return 9.95;
            case Size.Large:
                return 12.45;
            case Size.XLarge:
                return 13.95;
            case Size.Huge:
                return 19.95;
        }
    }
  }

  subTotal() : number {
    let subtotal = 0;
    for(let pizza of this.pizzas){
      subtotal += this.getPrice(pizza);
    }
    return subtotal;
  }

  taxes(): number {
    return this.subTotal() *  0.07613;
  }

  total(): number {
    return this.delivery ? this.subTotal() + this.taxes() + 4 : this.subTotal() + this.taxes();
  }

  styleSelect(e): void {
    this.piz = new Pizza(e.target.value);
  }

  sizeSelect(e: Size): void {
    this.piz.size = e;
  }

  toppingSelect(topping: string, checked: boolean): void {
    if (checked) this.piz.toppings.push(topping);
    else {
      let index = this.piz.toppings.findIndex(x => x === topping);
      this.piz.toppings.splice(index, 1);
    }
  }

  deliverySelect(yesNo: boolean): void {
    this.delivery = yesNo;
  }

  addPizza(): void {
    this.pizzas.push(this.piz);
    this.piz = null;
    $("#order-style input").each(function(){
      $(this).prop("checked", false);
    });
  }
  
  removePizza(pizza: Pizza): void {
    if (window.confirm("Delete this pizza?")) {
      let index = this.pizzas.findIndex(x => x === pizza);
      this.pizzas.splice(index, 1);
    }
  }

  toggleCheckout(yesNo: boolean): void {
    this.checkout = yesNo;
    console.log(this.checkout);
  }

  submitOrder() : void {
    this.router.navigate(["/order-success"]);
  }
}
