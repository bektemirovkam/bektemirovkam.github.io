@@include('webp.js');
@@include('../../node_modules/wow.js/dist/wow.js');


window.onload = ()=>{

	new WOW().init();

	let anchors = document.querySelectorAll('a[href*="#"]')

	for (let anchor of anchors) {
		anchor.addEventListener('click', function (e) {
			e.preventDefault()

			let blockID = anchor.getAttribute('href').substr(1)

			document.getElementById(blockID).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		});
	};

	let date = new Date(),
		day = date.getDate(),
		month = date.getMonth() + 1;

	if (month < 10) {
		month = '0' + month;
	};
	let year = date.getFullYear();

	document.querySelector(".date__day").innerHTML = day;
	document.querySelector(".date__month").innerHTML = month + " | " + year;

	// header slider

	let subSlider = new Swiper('.header__subslider', {
		slidesPerView: 4,
		spaceBetween: 20,
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
	});
	let sliderMain = new Swiper('.header__slider', {
		slidesPerView: 1,
		loop: true,
		effect: "fade",
		speed: 400,
		simulateTouch: false,
		navigation: {
			nextEl: '.slider-top__next',
			prevEl: '.slider-top__prev',
		},
		keyboard: {
			enabled: true,
			onlyInViewport: false,
		},
		thumbs: {
			swiper: subSlider,
		}
	});

	let mapDotClasses = ['.dot-big__north', '.dot-big__south', '.dot-big__west', '.dot-big__east'],
		mapRoadClasses = ['.road__north', '.road__south', '.road__west', '.road__east'];

	sliderMain.on("slideChange", (slider)=>{
		let dotActive = mapDotClasses[slider.realIndex],
			dotPrev = mapDotClasses[slider.previousIndex - 1],

			roadActive = mapRoadClasses[slider.realIndex],
			roadPrev = mapRoadClasses[slider.previousIndex - 1];

		document.querySelector(dotActive).classList.add("active");
		document.querySelector(dotPrev).classList.remove("active");

		document.querySelector(roadActive).classList.add("active");
		document.querySelector(roadPrev).classList.remove("active");
	});

	// surf slider

	let surfSliderDots = new Swiper('.slider-surf-dots', {
		slidesPerView: 8,
		freeMode: true,
	});
	let surfSlider = new Swiper('.surf__slider', {
		slidesPerView: 2,
		spaceBetween: 0,
		freeMode: true,
		centeredSlides: true,
		speed: 500,
		loop: true,
		keyboard: {
			enabled: true,
			onlyInViewport: false,
		},
		navigation: {
			nextEl: '.slider-surf__next',
			prevEl: '.slider-surf__prev',
		},
		thumbs: {
			swiper: surfSliderDots,
		},
		 breakpoints: {
		 	920: {
		 		slidesPerView: 4,
		 	},
		 	600: {
		 		slidesPerView: 3,
		 	},
		 },
	});

	//travel slider

	let travelSlider = new Swiper('.travel-slider', {
		slidesPerView: 1,
		loop: true,
		speed: 700,
		effect: "fade",
		simulateTouch: false,
		preloadImages: false,
    	lazy: true,
		fadeEffect: {
			crossFade: true
		},
		keyboard: {
			enabled: true,
			onlyInViewport: false,
		},
		navigation: {
			nextEl: '.travel-slider__next',
			prevEl: '.travel-slider__prev',
		},
	});

	//sleep slider

	let sleeplSlider = new Swiper('.sleep-slider', {
		slidesPerView: 1,
		loop: true,
		speed: 700,
		effect: "fade",
		simulateTouch: false,
		preloadImages: false,
    	lazy: true,
		fadeEffect: {
			crossFade: true
		},
		keyboard: {
			enabled: true,
			onlyInViewport: false,
		},
		navigation: {
			nextEl: '.sleep-slider__next',
			prevEl: '.sleep-slider__prev',
		},
	});

	// Shop Slider

	let shoplSlider = new Swiper('.shop-slider', {
		slidesPerView: 1,
		loop: true,
		speed: 700,
		effect: "fade",
		simulateTouch: false,
		preloadImages: false,
    	lazy: true,
		fadeEffect: {
			crossFade: true
		},
		keyboard: {
			enabled: true,
			onlyInViewport: false,
		},
		navigation: {
			nextEl: '.shop-slider__next',
			prevEl: '.shop-slider__prev',
		},
	});

	// Counters

	let counters = document.querySelectorAll(".quantity");
	let eventChange = new Event('change');
	for (let count of counters){
		count.insertAdjacentHTML("beforeend", '<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>');
		let input = count.querySelector('input[type="number"]'),
			btnUp = count.querySelector('.quantity-up'),
			btnDown = count.querySelector('.quantity-down');
			min = input.getAttribute('min'),
        	max = input.getAttribute('max');
        btnUp.onclick = ()=> {
        	let oldValue = parseFloat(input.value);
        	let newVal;
        	if (oldValue >= max) {
        		newVal = oldValue;
        	} else {
        		newVal = oldValue + 1;
        	}
        	count.querySelector('input[type="number"]').value = newVal;
        	input.dispatchEvent(eventChange);
        };
        btnDown.onclick = ()=> {
        	let oldValue = parseFloat(input.value);
        	let newVal;
        	if (oldValue <= min) {
        		newVal = oldValue;
        	} else {
        		newVal = oldValue - 1;
        	}
        	count.querySelector('input[type="number"]').value = newVal;
        	input.dispatchEvent(eventChange);
        };
	};

	let sleepDetails = document.querySelectorAll(".sleep-slider__details");
	for (let detail of sleepDetails){
		let inputNights = detail.querySelector(".nights");
		let inputGuests = detail.querySelector(".guests");
		let sleepSumm = detail.querySelector(".sum");
		let total = inputNights.value * sleepSumm.dataset.nights + (inputGuests.value - 1) * sleepSumm.dataset.guests;

		sleepSumm.innerHTML = "$" + total;

		inputGuests.onchange = ()=>{
			total = inputNights.value * sleepSumm.dataset.nights + (inputGuests.value - 1) * sleepSumm.dataset.guests;
			sleepSumm.innerHTML = "$" + total;
		};
		inputNights.onchange = ()=>{
			total = inputNights.value * sleepSumm.dataset.nights + (inputGuests.value - 1) * sleepSumm.dataset.guests;
			sleepSumm.innerHTML = "$" + total;
		};
	};

	// Shop circle
	let shopCircles = document.querySelectorAll(".surfoard-box__circle");
	for (let circle of shopCircles){
		circle.onclick = ()=>{
			circle.classList.toggle("active");
			circle.nextElementSibling.classList.toggle("active");
		}
	};

	let burger = document.querySelector(".hamburger");
	burger.onclick = ()=>{
		let menu = document.querySelector(".header__menu");
		let menuItems = document.querySelectorAll(".header__link");
		for(item of menuItems){
			item.onclick = ()=>{
				burger.classList.remove("active");
				menu.classList.remove("active");
				document.body.classList.remove("lock");
			};
		};
		burger.classList.toggle("active");
		menu.classList.toggle("active");
		document.body.classList.toggle("lock");
	}
};






