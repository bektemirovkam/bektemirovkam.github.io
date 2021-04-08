"use strict";

@@include("webp.js");
@@include("dynamic_adapt.js");
@@include("nouislider.min.js");

function slideToggle(elem, event) {
  event.preventDefault();
  if (!elem.classList.contains("show")) {
    elem.classList.add("show");
    elem.style.height = "auto";

    let height = elem.clientHeight + "px";

    elem.style.height = "0px";

    setTimeout(function () {
      elem.style.height = height;
    }, 0);
  } else {
    elem.style.height = "0px";

    elem.addEventListener(
      "transitionend",
      function () {
        elem.classList.remove("show");
      },
      {
        once: true,
      }
    );
  }
}
function ibg() {
  let ibg = document.querySelectorAll(".ibg");
  for (let i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector("img")) {
      ibg[i].style.backgroundImage =
        "url(" + ibg[i].querySelector("img").getAttribute("src") + ")";
    }
  }
}
ibg();

let burger = document.querySelector(".navBurger");
burger.onclick = () => {
  burger.classList.toggle("active");
  let menu = document.querySelector(".top-header__menu-wrapper");
  menu.classList.toggle("active");
  document.body.classList.toggle("lock");
};
let contactBtn = document.querySelector(".contacts-header__submenu");
contactBtn.onclick = (event) => {
  event.preventDefault();
  let contactMenu = document.querySelector(".contacts-header__wrapper");
  contactMenu.classList.toggle("active");
  document.documentElement.addEventListener("click", (event) => {
    if (!event.target.closest(".contacts-header")) {
      contactMenu.classList.remove("active");
    }
  });
};

let catalogParents = document.querySelectorAll(".catalog__parent");

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  for (let parent of catalogParents) {
    let dropMenu = parent.querySelector(".dropmenu__item");
    parent.firstElementChild.addEventListener(
      "click",
      slideToggle.bind(null, dropMenu)
    );
  }

  if (document.querySelector(".filter__title")) {
    let filterTitle = document.querySelector(".filter__title");
    let filterBody = document.querySelector(".filter__content");
    filterTitle.addEventListener("click", slideToggle.bind(null, filterBody));
  }
} else {
  for (let parent of catalogParents) {
    let dropMenu = parent.querySelector(".dropmenu__item");
    parent.onmouseenter = () => {
      dropMenu.classList.add("active");
    };
    parent.onmouseleave = () => {
      dropMenu.classList.remove("active");
    };
  }
}

let catalogBurger = document.querySelector(".header-catalog__burger");
let catalogBody = document.querySelector(".catalog__body");

catalogBurger.addEventListener("click", slideToggle.bind(null, catalogBody));
catalogBurger.addEventListener("click", () => {
  catalogBurger.classList.toggle("active");
});

let searchCheckboxes = document.querySelectorAll(".categories__checkbox");
let searchTitle = document.querySelector(".search-main__filter");
let searchCategories = document.querySelector(".search-main__categories");

for (let checkbox of searchCheckboxes) {
  checkbox.onchange = () => {
    checkbox.classList.toggle("active");
    let checkboxActive = document.querySelectorAll(
      ".categories__checkbox.active"
    );
    if (checkboxActive.length > 0) {
      searchTitle.classList.add("active");
      searchTitle.lastElementChild.innerHTML =
        searchTitle.lastElementChild.dataset.text + " " + checkboxActive.length;
    } else {
      searchTitle.classList.remove("active");
    }
  };
}
searchTitle.addEventListener("click", slideToggle.bind(null, searchCategories));

let mainSlider = new Swiper(".mainslider", {
  speed: 800,
  slidesPerView: 1,
  autoHeight: true,
  observer: true,
  observeParents: true,
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  pagination: {
    el: ".mainslider__dots",
    clickable: true,
  },
});
let mainSliderElem = document.querySelector(".mainslider");
if (mainSliderElem) {
  let mainsliderImages = document.querySelectorAll(".slidemain img");
  let mainSliderDots = mainSliderElem.querySelectorAll(
    ".swiper-pagination-bullet"
  );
  for (let i = mainsliderImages.length - 1; i >= 0; i--) {
    let imageSrc = mainsliderImages[i].getAttribute("src");
    mainSliderDots[i].style.backgroundImage = `url(${imageSrc})`;
  }
}

let productsSlider = new Swiper(".products-main__slider", {
  speed: 800,
  observer: true,
  observeParents: true,
  slidesPerView: 1,
  spaceBetween: 30,
  slidesPerColumnFill: "row",
  pagination: {
    el: ".slider-products__pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".slider-products__arrow-next",
    prevEl: ".slider-products__arrow-prev",
  },
  breakpoints: {
    // when window width is >= 320px
    800: {
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerColumn: 2,
    },
    500: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
  },
});

let brandsSlider = new Swiper(".brands__slider", {
  speed: 800,
  observer: true,
  observeParents: true,
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  navigation: {
    nextEl: ".slider-brands__arrow-next",
    prevEl: ".slider-brands__arrow-prev",
  },
  breakpoints: {
    // when window width is >= 320px
    400: {
      slidesPerView: 2,
    },
    578: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 4,
    },
    1100: {
      slidesPerView: 5,
    },
  },
});

VK.Widgets.Group("vk_groups", { mode: 3, width: 250 }, 20003922);
VK.Widgets.Group("vk_groups2", { mode: 3, width: 250 }, 20003922);

let priceSlider = document.querySelector(".price-filter__slider");
let inputFrom = document.querySelector(".input-from");
let inputBefore = document.querySelector(".input-before");
if (priceSlider) {
  noUiSlider.create(priceSlider, {
    start: [0, 100000],
    connect: true,
    range: {
      min: 0,
      max: 200000,
    },
    tooltips: true,
    format: {
      to: function (value) {
        return parseInt(value);
      },
      from: function (value) {
        return parseInt(value);
      },
    },
  });
  inputFrom.addEventListener("input", () => {
    priceSlider.noUiSlider.set([inputFrom.value, inputBefore.value]);
  });
  inputBefore.addEventListener("input", () => {
    priceSlider.noUiSlider.set([inputFrom.value, inputBefore.value]);
  });
}

let toggleFilter = document.querySelectorAll(".filter-toggle");

for (let i = toggleFilter.length - 1; i >= 0; i--) {
  let toggleCategory = toggleFilter[i].querySelector(
    ".filter-toggle__category"
  );
  let toggleArrow = toggleFilter[i].querySelector(".filter-toggle__arrow");
  let toggleBody = toggleFilter[i].querySelector(".filter-toggle__body");
  toggleCategory.addEventListener("click", slideToggle.bind(null, toggleBody));
  toggleCategory.addEventListener("click", () => {
    toggleArrow.classList.toggle("active");
    toggleCategory.classList.toggle("active");
  });
}

let objectSliderThumbs = new Swiper(".gallery-object__thumbs", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  speed: 800,
  observer: true,
  observeParents: true,
});
let objectSlider = new Swiper(".gallery-object", {
  speed: 800,
  observer: true,
  observeParents: true,
  slidesPerView: 1,
  spaceBetween: 0,
  thumbs: {
    swiper: objectSliderThumbs,
  },
});
let counters = document.querySelectorAll(".quantity");
let eventChange = new Event("change");
for (let count of counters) {
  let input = count.querySelector('input[type="number"]'),
    btnUp = count.querySelector(".quantity-up"),
    btnDown = count.querySelector(".quantity-down"),
    min = input.getAttribute("min"),
    max = input.getAttribute("max");
  btnUp.onclick = () => {
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
  btnDown.onclick = () => {
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
}

const TabItemSelector = ".tabs__item";
const ContentItemSelector = ".tabs-block";

class TabsManager {
  constructor(navNode) {
    this.tabs = [];
    this.activeTab = null;

    this.initFromHtml(navNode);
    this.activateTab(this.tabs[0]);
  }

  initFromHtml(navNode) {
    const headers = navNode.querySelectorAll(TabItemSelector);
    const contents = navNode.querySelectorAll(ContentItemSelector);

    for (var i = 0; i < headers.length; i++) {
      this.registerTab(headers[i], contents[i]);
    }
  }

  registerTab(header, content) {
    const tab = new TabItem(header, content);
    tab.onActivate(() => this.activateTab(tab));
    this.tabs.push(tab);
  }

  activateTab(tabItem) {
    if (this.activeTab) {
      this.activeTab.setActive(false);
    }

    this.activeTab = tabItem;
    this.activeTab.setActive(true);
  }
}

const ActiveTabHeaderClass = "active";
const ActiveTabContentClass = "active";

class TabItem {
  constructor(header, content) {
    this.header = header;
    this.content = content;
  }
  onActivate(action) {
    this.header.addEventListener("click", () => action(this));
  }
  setActive(value) {
    this.header.classList.toggle(ActiveTabHeaderClass, value);
    this.content.classList.toggle(ActiveTabContentClass, value);
  }
}
if (document.querySelector(".tabs")) {
  // let tabs = new TabsManager(document.querySelectorAll('.tabs'));
  let tabs = document.querySelectorAll(".tabs");
  for (var i = tabs.length - 1; i >= 0; i--) {
    let tab = new TabsManager(tabs[i]);
  }
}
