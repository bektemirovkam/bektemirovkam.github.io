import "focus-visible/dist/focus-visible.min";
import Choices from "choices.js";

import { testWebP } from "./modules";

const tableToggler = () => {
  const toggleBtns = document.querySelectorAll(".first-td__arrow");

  for (let btn of toggleBtns) {
    btn.addEventListener("click", (e) => {
      const target = e.target;

      if (
        target &&
        (target instanceof HTMLElement || target instanceof SVGElement)
      ) {
        const tr = target.closest("tr"); // находим родительскую tr
        btn.classList.toggle("active");

        if (tr && tr instanceof HTMLElement) {
          let box = [] as HTMLElement[],
            next = tr.nextElementSibling;

          // собираем все tr с классом dropdown-tr в массив box
          while (
            next &&
            next.classList.contains("dropdown-tr") &&
            next instanceof HTMLElement
          ) {
            box.push(next);
            next = next.nextElementSibling;
          }

          // добавляем или удаляем класс для показа
          box.forEach(function (item) {
            item.classList.toggle("show");
          });
        }
      }
    });
  }
};

const iconsEventHandler = (
  element: HTMLElement,
  eventName: "mouseenter" | "mouseleave" | "focus" | "blur",
  list: NodeListOf<Element>,
  dataAtrName: string
) => {
  element.addEventListener(eventName, (e) => {
    const target = e.target as HTMLElement;
    const index = target.dataset.iconIndex;

    list.forEach((item) => {
      if (item instanceof HTMLElement) {
        const findIndex = item.dataset[dataAtrName];
        if (findIndex === index) {
          switch (eventName) {
            case "focus":
              item.classList.add("focus");
              break;

            case "mouseenter":
              item.classList.add("focus");
              break;

            default: {
              item.classList.remove("focus");
            }
          }
        }
      }
    });
  });
};

const handleChangeCheckboxValue = (value: boolean, selector: string) => {
  const checkboxes = document.querySelectorAll(selector);

  checkboxes.forEach((checkbox) => {
    if (checkbox instanceof HTMLInputElement) {
      checkbox.checked = value;
    }
  });
};

const handleIconHover = () => {
  const icons = document.querySelectorAll(".dropdown-tr__icon");
  for (let icon of icons) {
    iconsEventHandler(icon as HTMLElement, "mouseenter", icons, "iconIndex");
    iconsEventHandler(icon as HTMLElement, "mouseleave", icons, "iconIndex");
    iconsEventHandler(icon as HTMLElement, "focus", icons, "iconIndex");
    iconsEventHandler(icon as HTMLElement, "blur", icons, "iconIndex");
  }
};

const handleSelectAll = () => {
  const mainCheckbox = document.querySelector(".checkbox_all");

  if (mainCheckbox && mainCheckbox instanceof HTMLInputElement) {
    mainCheckbox.addEventListener("change", (e) => {
      if (mainCheckbox.checked) {
        handleChangeCheckboxValue(true, ".checkbox_row");
      } else {
        handleChangeCheckboxValue(false, ".checkbox_row");
      }
    });
  }
};

const setColspanStickyTDs = (value: number) => {
  const dropdownStickyTDs = document.querySelectorAll(".dropdown-tr__sticky");

  dropdownStickyTDs.forEach((element) => {
    if (element instanceof HTMLTableCellElement) {
      element.colSpan = value;
    }
  });
};

let shownFilter = false;

const handleShowTableFilter = () => {
  const filterBtn = document.querySelector(
    ".table__icon-btn_filter"
  ) as HTMLButtonElement | null;

  const secondTDs = document.querySelectorAll(".second-td");

  filterBtn?.addEventListener("click", () => {
    secondTDs.forEach((elem) => {
      if (elem instanceof HTMLElement) {
        const currentDisplayState = elem.style.display;

        if (currentDisplayState) {
          elem.style.display = "";
          setColspanStickyTDs(1);
          shownFilter = false;
        } else {
          elem.style.display = "table-cell";
          setColspanStickyTDs(2);
          shownFilter = true;
        }
      }
    });
  });
};

const handleResize = () => {
  if (window.matchMedia("(max-width: 768px)").matches) {
    if (shownFilter) {
      setColspanStickyTDs(2);
    } else {
      setColspanStickyTDs(1);
    }
  }
};

const initSelect = () => {
  const element = document.querySelector(".second-td__select");
  if (element) {
    const choices = new Choices(element, {
      searchEnabled: false,
      itemSelectText: "",
      position: "bottom",
    });
  }
};

window.addEventListener("DOMContentLoaded", () => {
  testWebP(function (support) {
    if (support == true) {
      document.documentElement.classList.add("webp");
    } else {
      document.documentElement.classList.add("no-webp");
    }
  });
  handleResize();
  tableToggler();
  handleIconHover();
  handleSelectAll();
  handleShowTableFilter();
  initSelect();
});

window.addEventListener("resize", (e) => {
  handleResize();
});
