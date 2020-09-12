function testWebP(callback) {

var webP = new Image();
webP.onload = webP.onerror = function () {
callback(webP.height == 2);
};
webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

if (support == true) {
document.querySelector('body').classList.add('webp');
}else{
document.querySelector('body').classList.add('no-webp');
}
});;


let phone = document.querySelector(".phone-icon");

phone.onclick = ()=>{
	let phonesBox = document.querySelector(".phones");
	phonesBox.classList.toggle('active');
	document.addEventListener("click", (event)=>{
		if (!event.target.closest(".contacts__phones")){
			phonesBox.classList.remove('active');
		};
	});
};

let scrollUp = document.querySelector(".scrollup");

window.addEventListener('scroll', ()=>{
	if (pageYOffset > 300) {
		scrollUp.classList.add("active");
	}
	else {
		scrollUp.classList.remove("active");
	}
});

scrollUp.onclick = (event)=>{
	event.preventDefault();
	let topElem = document.querySelector(".slider");
	topElem.scrollIntoView({block: "center", behavior: "smooth"});
};