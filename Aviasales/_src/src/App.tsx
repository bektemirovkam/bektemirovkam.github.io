import React, { useEffect, useState } from "react";
import { Filter, Header, Tabs, TicketsList } from "./components";
import { FilterValuesType, IFilter, TabsValuesType } from "./models/Filter";
import "./scss/index.scss";
import searchAPI from "./services/search";

function App() {
  const [filter, setFilter] = useState<IFilter>({
    "0": true,
    "1": true,
    "2": true,
    "3": true,
    all: true,
  });
  const [tabValue, setTabValue] = useState<TabsValuesType>("Самый дешевый");
  const [idLoadingError, setIdLoadingError] = useState<string | null>(null);
  const [searchId, setSearchId] = useState<string | null>(null);
  const [ticketsLoading, setTicketsLoading] = useState(false);

  const getSearchId = async () => {
    try {
      setIdLoadingError(null);
      const { searchId } = await searchAPI.getSearchId();
      setSearchId(searchId);
    } catch (error) {
      setIdLoadingError("Произошла ошибка!");
    }
  };

  useEffect(() => {
    getSearchId();
  }, []);

  return (
    <div className="main">
      <Header ticketsLoading={ticketsLoading} />

      <div className="main__content content">
        <div className="content__leftside">
          <Filter filter={filter} setFilter={setFilter} />
        </div>
        <div className="content__rightside">
          <Tabs tabValue={tabValue} setTabValue={setTabValue} />
          {idLoadingError && (
            <div className="main__error">
              <span>{idLoadingError}</span>
            </div>
          )}
          {searchId && (
            <TicketsList
              searchId={searchId}
              filter={filter}
              tabValue={tabValue}
              setTicketsLoading={setTicketsLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
