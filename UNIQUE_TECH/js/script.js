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

var mySwiper = new Swiper('.swiper-container', {
	slidesPerView: 1,
	speed: 400,
	loop: true,
	spaceBetween: 20,
	pagination: {
		el: '.swiper-pagination',
	},
});
let burger = document.documentElement.querySelector(".top-header__burger");
let menu = document.documentElement.querySelector(".top-header__menu");
burger.onclick = ()=>{
	menu.classList.toggle("active");
	burger.classList.toggle("active");
	document.body.classList.toggle("lock");
}

document.addEventListener("click", (event)=>{
	if (!event.target.closest(".header__top")){
		let activeMenu = document.documentElement.querySelector(".top-header__menu");
		let activeBurger = document.documentElement.querySelector(".top-header__burger");
		activeBurger.classList.remove("active");
		activeMenu.classList.remove("active");
		document.body.classList.remove("lock");
	}
})