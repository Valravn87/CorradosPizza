"use strict";
createEvents();
//var subtotal = 0, taxes = 0, totalPrice = 0;
const SALES_TAX = 0.07613;
const DELIVERY_CHARGE = 4.0;
var myPizzas = new Array();

function subtotal(){
	var sub = 0;
	for (var i = 0; i < myPizzas.length; i++){
		sub += myPizzas[i].getPrice();
	}
	return sub;
}

function taxes(){
	return subtotal() * SALES_TAX;
}

function totalPrice(){
	//Add deliver charge if delivery option is checked
	var deliveryOption = document.getElementsByName("delivery-carryout")[0];
	if (deliveryOption.checked){
		return subtotal() + taxes() + DELIVERY_CHARGE;
	} else {
		return subtotal() + taxes();
	}
}

Pizza.prototype.getPrice = function(){
	var basePrice = 0.0, toppingPrice = 0.0, toppingCount = this.toppings.length;
	switch (this.style) {
		case "Chicago Thin-Crust": case "St. Louis Thin-Crust":
			switch (this.size) {
				case "10\" Small":
					basePrice = 8.95;
					toppingPrice = 0.75;
					break;
				case "12\" Medium":
					basePrice = 9.95;
					toppingPrice = 1.00;
					break;
				case "14\" Large":
					basePrice = 12.45;
					toppingPrice = 1.50;
					break;
				case "16\" X-Large":
					basePrice = 13.95;
					toppingPrice = 2.00;
					break;
			}
			break;
		case "New York Hand-Tossed":
			switch (this.size) {
				case "16\" X-Large":
					basePrice = 13.95;
					toppingPrice = 2.00;
					break;
				case "20\" Yooge":
					basePrice = 19.95;
					toppingPrice = 3.00;
					break;
			}
			break;
		case "Sicilian Square Pie":
			switch (this.size) {
				case "9 x 9\" Small":
					basePrice = 9.95;
					toppingPrice = 0.75;
					break;
				case "13 x 9\" Medium":
					basePrice = 10.95;
					toppingPrice = 1.00;
					break;
				case "15 x 12\" Large":
					basePrice = 13.45;
					toppingPrice = 1.50;
					break;
			}
			break;
		case "Chicago Deep-Dish":
			switch (this.size) {
				case "10\" Small":
					basePrice = 11.95;
					toppingPrice = 1.50;
					break;
				case "14\" Large":
					basePrice = 16.95;
					toppingPrice = 2.50;
					break;
			}
			break;
	}
	return basePrice + (toppingPrice * toppingCount);
}

function test(){
	/*var strTopping = "";
	var chkToppings = document.querySelectorAll("#toppings input");	
	var lblToppings = document.querySelectorAll("#toppings td label");
	for (var i = 0; i < chkToppings.length; i++){
		if (chkToppings[i].checked){
			strTopping = lblToppings[i].innerHTML;
			window.alert(strTopping);
		}
	}*/
}

function Pizza(size, style){
	this.size = size;
	this.style = style;
	this.toppings = new Array();
}

function changeSizeChart(){
	document.getElementById("btnAdd").disabled = true;
	document.getElementById("btnAdd").className = "";
	var sizes = document.querySelectorAll("#order-size tr");
	for (var i = 1; i < sizes.length; i++){
		sizes[i].style.display = "none";
		sizes[i].querySelector("td input").checked = false;
	}
	if (document.getElementById("chicago-thin").checked){
		sizes[1].style.display = "block";
		sizes[3].style.display = "block";
		sizes[5].style.display = "block";
		sizes[6].style.display = "block";
	}else if (document.getElementById("new-york").checked){
		sizes[6].style.display = "block";
		sizes[8].style.display = "block";
	}else if (document.getElementById("sicilian").checked){
		sizes[2].style.display = "block";
		sizes[4].style.display = "block";
		sizes[7].style.display = "block";
	}else if (document.getElementById("chicago-deep").checked){
		sizes[1].style.display = "block";
		sizes[5].style.display = "block";
	}else if (document.getElementById("st-louis").checked){
		sizes[3].style.display = "block";
		sizes[5].style.display = "block";
		sizes[6].style.display = "block";
	}
}

function displayOptions(){
	document.getElementById("order-size").style.display = "block";
	document.getElementById("toppings").style.display = "block";
}

function resetOptions() {
	document.getElementById("order-size").style.display = "none";
	document.getElementById("toppings").style.display = "none";
	document.getElementById("btnAdd").disabled = true;
	document.getElementById("btnAdd").className = "";
	var radStyle = document.querySelectorAll("#order-style input");
	for (var i = 0; i < radStyle.length; i++){
		radStyle[i].checked = false;
	}
	var chkToppings = document.querySelectorAll("#toppings input");	
	for (var i = 0; i < chkToppings.length; i++){
		chkToppings[i].checked = false;
	}
}	

function addItem (){
	var myPie = new Pizza("","");
	//var strSize = "";
	//var strStyle = "";
	var strToppings = "Cheese";
	//var arrayToppings = new Array();
	// check for size
	var radSize = document.querySelectorAll("#order-size input");
	var lblSize = document.querySelectorAll("#order-size td label");
	for (var i = 0; i < radSize.length; i++){
		if (radSize[i].checked){
			myPie.size = lblSize[i].innerHTML;
			break;
		}
	}
	// check for crust style
	var radStyle = document.querySelectorAll("#order-style input");
	var lblStyle = document.querySelectorAll("#order-style td label");
	for (var i = 0; i < radStyle.length; i++){
		if (radStyle[i].checked){
			myPie.style = lblStyle[i].innerHTML;
			break;
		}
	}
	// check for toppings
	var chkToppings = document.querySelectorAll("#toppings input");	
	var lblToppings = document.querySelectorAll("#toppings td label");
	for (var i = 0; i < chkToppings.length; i++){
		if (chkToppings[i].checked){
			myPie.toppings.push(lblToppings[i].innerHTML);
		}
	}
	if (myPie.toppings.length > 0){
		strToppings = myPie.toppings.join(", ");
	}
	var itemBox = document.createElement("div");
	var leftBox = document.createElement("div");
	var rightBox = document.createElement("div");
	var deleteBox = document.createElement("div");
	var header3 = document.createElement("h3");
	var para = document.createElement("p");
	var x = document.createElement("img");
	itemBox.className = "order-item";
	leftBox.className = "order-item-name";
	rightBox.className = "order-item-desc";
	deleteBox.className = "order-item-delete";
	x.className = "x-delete";
	x.src = "images/close.png"
	x.id = "x" + myPizzas.length;
	if (window.addEventListener)x.addEventListener("click", removeItem, false);
	else if (window.attachEvent)x.attachEvent("onclick", removeItem);
	header3.innerHTML = "BYO Pizza";
	leftBox.appendChild(header3);
	leftBox.innerHTML += accounting.formatMoney(myPie.getPrice());
	para.innerHTML = myPie.size + "<br>" + myPie.style + "<br>" + strToppings;
	rightBox.appendChild(para);
	deleteBox.append(x);
	itemBox.appendChild(leftBox);
	itemBox.appendChild(rightBox);
	itemBox.appendChild(deleteBox);
	var totalBox = document.getElementById("order-total-box");
	document.getElementsByClassName("container")[0].insertBefore(itemBox, totalBox);
	totalBox.style.display = "block";
	myPizzas.push(myPie);
	updateTotal();
	resetOptions();
	enabledBtnCheckout();
}

function updateTotal(){
	if (myPizzas.length < 1){ 
		document.getElementById("order-total-box").style.display = "none";
		document.getElementById("btnCheckout").disabled = true;
		document.getElementById("btnCheckout").className = "";
		return;
	}
	//Display Delivery Charge box only if delivery option is checked
	var deliveryOption = document.getElementsByName("delivery-carryout")[0];
	if (deliveryOption.checked){
		document.getElementsByClassName("order-total-sub-box")[2].style.display = "block";
	} else {
		document.getElementsByClassName("order-total-sub-box")[2].style.display = "none";
	}
	var priceBoxes = document.querySelectorAll("#order-total-box p");
	priceBoxes[0].innerHTML = accounting.formatMoney(subtotal());
	priceBoxes[1].innerHTML = accounting.formatMoney(taxes());
	priceBoxes[2].innerHTML = accounting.formatMoney(DELIVERY_CHARGE);
	priceBoxes[3].innerHTML = accounting.formatMoney(totalPrice());
}

function removeItem(e){
		if(!e) e = window.event;
		var sender = e.srcElement || e.target;
		var myID = sender.id;
		var index = myID.substr(1);
		// remove the entry box for that item
		var itemBoxes = document.getElementsByClassName("order-item");
		var parentNode = document.getElementsByClassName("container")[0];
		parentNode.removeChild(itemBoxes[index]);
		// remove that pizza object from the myPizzas array
		myPizzas.splice(index, 1);
		// update the index numbers for the x's
		if (itemBoxes){
			var x = document.getElementsByClassName("x-delete");
			for (var i = 0; i < itemBoxes.length; i++){
				x[i].id = "x" + i;
			}
		}
		// update the total box
		updateTotal();
}

function enableBtnAdd(){
	document.getElementById("btnAdd").disabled = false;
	document.getElementById("btnAdd").className = "enabled-button";
}

function enabledBtnCheckout(){
	if (myPizzas.length < 1) {
		return;
	}
	var radDelivery = document.getElementsByName("delivery-carryout");
	for (var i = 0; i < radDelivery.length; i++){
		if (radDelivery[i].checked){
			document.getElementById("btnCheckout").disabled = false;
			document.getElementById("btnCheckout").className = "enabled-button";
			return;
		}
	}
}

function enabledBtnSubmit(){
	var btnSubmit = document.getElementById("btnSubmit");
	if (validateAddress() && validateCard()){
		btnSubmit.disabled = false;
		btnSubmit.className = "enabled-button";
	}else{
		btnSubmit.disabled = true;
		btnSubmit.className = "";
	}
}

/*function deliveryCheck(){
	//Display Delivery Charge box only if delivery option is checked
	var deliveryOption = document.getElementsByName("delivery-carryout")[0];
	if (deliveryOption.checked){
		document.getElementsByClassName("order-total-sub-box")[2].style.display = "block";
		totalPrice = subtotal + taxes + DELIVERY_CHARGE;
	} else {
		document.getElementsByClassName("order-total-sub-box")[2].style.display = "none";
		totalPrice = subtotal + taxes;
	}
	var priceBoxes = document.querySelectorAll("#order-total-box p");
	priceBoxes[0].innerHTML = accounting.formatMoney(subtotal);
	priceBoxes[1].innerHTML = accounting.formatMoney(taxes);
	priceBoxes[2].innerHTML = accounting.formatMoney(DELIVERY_CHARGE);
	priceBoxes[3].innerHTML = accounting.formatMoney(totalPrice);
}*/

function validateAddress(){
	var addressFields = document.querySelectorAll("#order-address input");
	for (var i = 0; i < addressFields.length; i++){
		if (i != 3 && addressFields[i].value === ""){
			return false;
		}
	}
	return true;
}

function validateCard(){
	var chkCard = document.querySelectorAll("#order-credit-card-type input");
	var cardFields = document.querySelectorAll("#order-credit-card-detail input");
	var cardSelected = false;
	for (var i = 0; i < chkCard.length; i++){
		if (chkCard[i].checked){
			cardSelected = true;
			break;
		}
	}
	if (!cardSelected){
		return false;
	}
	for (var i = 0; i < cardFields.length; i++){
		if (cardFields[i].value ===""){
			return false;
		}
	}
	return true;
}

function checkout() {
	//document.getElementById("order-pizza-build").style.display = "none";
	document.getElementById("stupid-box").style.display = "none";
	document.getElementById("order-checkout").style.display = "block";
}

function back() {
	document.getElementById("stupid-box").style.display = "block";
	document.getElementById("order-checkout").style.display = "none";
}

/*if (window.addEventListener) {
	window.addEventListener("load", test, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", test);
}*/

function createEvents(){
	var radStyles = document.getElementsByName("style");
	for (var i = 0; i < radStyles.length; i++){
		if (window.addEventListener) {
			radStyles[i].addEventListener("change", changeSizeChart, false);
			radStyles[i].addEventListener("click", displayOptions, false);
		} else if (window.attachEvent) {
			radStyles[i].attachEvent("onchange", changeSizeChart);
			radStyles[i].attachEvent("onclick", displayOptions);
		}
	}
	/*var chkToppings = document.querySelectorAll("#toppings input");
	for (var i = 0; i < chkToppings.length; i++){
		if (window.addEventListener){
			//chkToppings[i].addEventListener("click", test, false);
		} else if (window.attachEvent) {
			//chkToppings[i].attachEvent("onclick", test);
		}
	}*/
	var radSize = document.getElementsByName("size");
	for (var i = 0; i < radSize.length; i++){
		if (window.addEventListener){
			radSize[i].addEventListener("click", enableBtnAdd, false);
		} else if (window.attachEvent){
			radSize[i].attachEvent("onclick", enableBtnAdd);
		}
	}
	
	var radDelivery = document.getElementsByName("delivery-carryout");
	for (var i = 0; i < radDelivery.length; i++){
		if (window.addEventListener){
			radDelivery[i].addEventListener("click", updateTotal, false);
			radDelivery[i].addEventListener("click", enabledBtnCheckout, false);
		} else if (window.attachEvent){
			radDelivery[i].attachEvent("onclick", updateTotal);
			radDelivery[i].attachEvent("onclick", enabledBtnCheckout);
		}
	}
	
	var checkoutFields = document.querySelectorAll("#order-checkout input")
	for (var i = 0; i < checkoutFields.length; i++){
		if (window.addEventListener){
			checkoutFields[i].addEventListener("change", enabledBtnSubmit, false)
		} else if (window.attachEvent){
			checkoutFields[i].attachEvent("onchange", enabledBtnSubmit)
		}
	}
	
	if (window.addEventListener) {
		document.getElementById("btnAdd").addEventListener("click", addItem, false);
		document.getElementById("btnCheckout").addEventListener("click", checkout, false);
		document.getElementById("btnBack").addEventListener("click", back, false);
	} else if (window.attachEvent) {
		document.getElementById("btnAdd").attachEvent("onclick", addItem);
		document.getElementById("btnCheckout").attachEvent("onclick", checkout);
		document.getElementById("btnBack").attachEvent("onclick", back);
	}
}
