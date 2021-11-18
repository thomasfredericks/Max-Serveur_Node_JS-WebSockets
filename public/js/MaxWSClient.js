
window.onload = function () {
	let grey = backgroundToggle * 255;
	document.body.style.backgroundColor = 'rgb('+grey+','+grey+','+grey+')';
}

let ws = new WebSocket("ws://localhost:7474");
let backgroundToggle = 0 ;

ws.onopen = function (event) {
	console.log("sending data...");
	ws.send("Ready, willing and able!");
};

ws.onmessage = function (event) {
	let parsedArray = event.data.split(' ');

	if ( parsedArray[0] == "/pot" ) {
		let value = parseInt(parsedArray[1]);
		let logo = document.getElementById("logo");
		logo.style.transform = "rotate("+ (value % 360) +"deg)"

	} else if ( parsedArray[0] == "/bouton" ) {
		backgroundToggle = parseInt(parsedArray[1]);
		let grey = backgroundToggle * 255;
		document.body.style.backgroundColor = 'rgb('+grey+','+grey+','+grey+')';
	}

};


// Managing the interaction
window.onbeforeunload = function(){
  ws.close();
}
