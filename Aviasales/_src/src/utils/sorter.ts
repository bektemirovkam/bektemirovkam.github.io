import sortBy from "lodash.sortby";
import { TabsValuesType } from "../models/Filter";
import { ITicket } from "../models/Search";

export const getSortedTickets = (arr: ITicket[], tabValue: TabsValuesType) => {
  if (tabValue === "Оптимальный") {
    return sortBy(arr, [
      function (item) {
        return item.price;
      },
      function (item) {
        return item.segments[0].duration;
      },
    ]);
  }

  return arr.sort((a, b) => {
    if (tabValue === "Самый быстрый") {
      return a.segments[0].duration - b.segments[0].duration;
    } else {
      return a.price - b.price;
    }
  });
};
