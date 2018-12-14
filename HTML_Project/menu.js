"use strict";
createEvents();

function displayCurrent(e){
	if(!e) e = window.event;
	var sender = e.srcElement || e.target;
	while (sender && sender.nodeName.toLowerCase() != "a") sender = sender.parentNode;
	var myID = sender.id;
	var destination = myID.substr(5);
	var divider = document.getElementsByTagName("hr");
	var section = document.getElementsByClassName("menu-section");
	for (var i = 0; i < divider.length; i++){
		divider[i].style.display = "none";
	}
	for (var i = 0; i < section.length; i++){
		if (section[i].id === destination){ 
			section[i].style.display = "block";
		}else{ 
			section[i].style.display = "none";
		}
	}
}

function displayAll(){
	var divider = document.getElementsByTagName("hr");
	var section = document.getElementsByClassName("menu-section");
	for (var i = 0; i < divider.length; i++){
		divider[i].style.display = "block";
	}
	for (var i = 0; i < section.length; i++){ 
		section[i].style.display = "block";
	}
}

function createEvents(){
	var menuNav = document.querySelectorAll(".menu-toc a");
	if (window.addEventListener)  {
		menuNav[0].addEventListener("click", displayAll, false);
		for (var i = 1; i < menuNav.length; i++) menuNav[i].addEventListener("click", displayCurrent, false);
	} else if (window.attachEvent) {
		menuNav[0].attachEvent("onclick", displayAll);
		for (var i = 1; i < menuNav.length; i++) menuNav[i].attachEvent("onclick", displayCurrent);
	}
}