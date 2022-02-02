import { FilterValuesType, IFilter } from "../models/Filter";
import { ITicket } from "../models/Search";

export const getFilteredTickets = (arr: ITicket[], filter: IFilter) => {
  return arr.filter((ticket) => {
    if (filter.all) {
      return true;
    } else {
      return filter[
        String(ticket.segments[0].stops.length) as FilterValuesType
      ];
      // && filter[String(ticket.segments[1].stops.length) as FilterValuesType]
    }
  });
};
