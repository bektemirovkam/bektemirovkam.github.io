import React, { FC, memo } from "react";
import { Card } from "./ui";
import { ITicket } from "../models/Search";
import {
  formatDate,
  getCorrectVariant,
  getEndTravelTime,
  getTimeFromMins,
} from "../utils/formatter";

interface ITicketProps {
  ticket: ITicket;
}

const Ticket: FC<ITicketProps> = ({ ticket }) => {
  return (
    <Card className="ticket">
      <div className="ticket__header">
        <div className="ticket__price">{ticket.price} P</div>
        <div className="ticket__company">
          <img src={`//pics.avs.io/99/36/${ticket.carrier}.png`} alt="" />
        </div>
      </div>
      <div className="ticket__info">
        {ticket.segments.map((segment) => {
          return (
            <div
              className="ticket__row"
              key={`${segment.date}_${segment.duration}`}
            >
              <div className="ticket__item">
                <div className="ticket__item-title">
                  {segment.origin} – {segment.destination}
                </div>
                <div className="ticket__item-value">
                  {`${formatDate(segment.date)} - ${getEndTravelTime(
                    segment.date,
                    segment.duration
                  )}`}
                </div>
              </div>
              <div className="ticket__item">
                <div className="ticket__item-title">В пути</div>
                <div className="ticket__item-value">
                  {getTimeFromMins(segment.duration)}
                </div>
              </div>
              <div className="ticket__item">
                <div className="ticket__item-title">
                  {segment.stops.length > 0
                    ? `${segment.stops.length} ${getCorrectVariant(
                        segment.stops.length
                      )}`
                    : "без пересадок"}
                </div>
                <div className="ticket__item-value">
                  {segment.stops.map((stop, index) => {
                    return <span key={`${stop}_${index}`}>{stop}</span>;
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default memo(Ticket);
