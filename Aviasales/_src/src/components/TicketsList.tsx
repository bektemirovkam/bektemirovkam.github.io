import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { IFilter, TabsValuesType } from "../models/Filter";
import { ITicket } from "../models/Search";
import searchAPI from "../services/search";
import { getFilteredTickets } from "../utils/filter";
import { getSortedTickets } from "../utils/sorter";
import Ticket from "./Ticket";
import { AppButton } from "./ui";

interface ITicketsListProps {
  searchId: string;
  filter: IFilter;
  tabValue: TabsValuesType;
  setTicketsLoading: (value: boolean) => void;
}

const TicketsList: FC<ITicketsListProps> = ({
  searchId,
  filter,
  tabValue,
  setTicketsLoading,
}) => {
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [showTicketsCounter, setShowTicketCounter] = useState(5);

  const getTickets = useCallback(
    async (searchId: string) => {
      try {
        setLoadingError(null);
        setTicketsLoading(true);
        const { tickets, stop } = await searchAPI.getTickets(searchId);
        setTickets(tickets);
        if (!stop) {
          setTimeout(() => {
            getTickets(searchId);
          }, 3000);
        } else {
          setTicketsLoading(false);
        }
      } catch (error) {
        setLoadingError("Произошла ошибка!");
        setTicketsLoading(false);
        await getTickets(searchId);
      }
    },
    [setTicketsLoading]
  );

  useEffect(() => {
    if (searchId) {
      getTickets(searchId);
    }
  }, [getTickets, searchId]);

  const addTickets = () => {
    setShowTicketCounter((prev) => prev + 5);
  };

  const filteredTickets = useMemo(() => {
    const filteredTickets = getFilteredTickets(tickets, filter);
    return getSortedTickets(filteredTickets, tabValue).slice(
      0,
      showTicketsCounter
    );
  }, [showTicketsCounter, filter, tabValue, tickets]);

  return (
    <div className="ticket-list">
      {loadingError && (
        <div className="ticket-list__error">
          <span>{loadingError}</span>
        </div>
      )}
      <>
        {filteredTickets.map((ticket) => (
          <Ticket
            ticket={ticket}
            key={`${ticket.segments[0].date}_${ticket.segments[1].date}`}
          />
        ))}
        <AppButton title="Показать еще 5 билетов" onClick={addTickets} />
      </>
    </div>
  );
};

export default TicketsList;
