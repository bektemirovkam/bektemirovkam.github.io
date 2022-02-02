export type FilterValuesType = "0" | "1" | "2" | "3" | "all";
export type TabsValuesType = "Самый дешевый" | "Самый быстрый" | "Оптимальный";

export interface IFilter {
  "0": boolean;
  "1": boolean;
  "2": boolean;
  "3": boolean;
  all: boolean;
}
