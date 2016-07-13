window.onload = choosePic;

function choosePic() {
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (xhttp.readyState == 4 && xhttp.status == 200) {
		var img = new Image() || document.createElement("img");
		img.src = xhttp.responseText;
		console.log(img);
		document.getElementsByTagName('div')[0].appendChild(img);
	}};
	xhttp.open("GET", "/random_restaurant", true);
	xhttp.send();	
} 