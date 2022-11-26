import Swiper, { Pagination } from "swiper";
import { testWebP } from "./modules";

window.addEventListener("DOMContentLoaded", () => {
  testWebP(function (support) {
    if (support == true) {
      document.documentElement.classList.add("webp");
    } else {
      document.documentElement.classList.add("no-webp");
    }
  });
});

const handleActiveClass = (type: "add" | "remove", ...selectors: string[]) => {
  for (const selector of selectors) {
    const target = document.querySelector(selector);
    if (type === "add") {
      target?.classList.add("active");
    } else if (type === "remove") {
      target?.classList.remove("active");
    }
  }
};

window.addEventListener("DOMContentLoaded", () => {
  const headerBurger = document.querySelector(".header__burger");

  headerBurger?.addEventListener("click", (e) => {
    const target = e.target as HTMLDivElement;

    if (target.closest(".header__burger.active")) {
      handleActiveClass("remove", ".header__burger", ".header__menu");
      document.body.classList.remove("lock");
    } else {
      handleActiveClass("add", ".header__burger", ".header__menu");
      document.body.classList.add("lock");
    }
  });

  new Swiper(".comments__slider", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    modules: [Pagination],
    breakpoints: {
      1266: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
      875: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  });
});

//TODO: сделать чтобы меню закрывалось при клике вне меню
//TODO: прописать правильные alt для картинок
