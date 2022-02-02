import React, { FC, ChangeEvent } from "react";
import { TabsValuesType } from "../models/Filter";

interface ITabsProps {
  tabValue: TabsValuesType;
  setTabValue: (value: TabsValuesType) => void;
}

const Tabs: FC<ITabsProps> = ({ tabValue, setTabValue }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTabValue(event.target.value as TabsValuesType);
  };

  return (
    <fieldset className="tabs">
      <label>
        <input
          className="tabs__input"
          type="radio"
          value="Самый дешевый"
          name="tab"
          onChange={handleChange}
          checked={tabValue === "Самый дешевый"}
        />
        <span className="tabs__text">Самый дешевый</span>
      </label>

      <label>
        <input
          className="tabs__input"
          type="radio"
          value="Самый быстрый"
          name="tab"
          onChange={handleChange}
          checked={tabValue === "Самый быстрый"}
        />
        <span className="tabs__text">Самый быстрый</span>
      </label>

      <label>
        <input
          className="tabs__input"
          type="radio"
          value="Оптимальный"
          name="tab"
          onChange={handleChange}
          checked={tabValue === "Оптимальный"}
        />
        <span className="tabs__text">Оптимальный</span>
      </label>
    </fieldset>
  );
};

export default Tabs;
