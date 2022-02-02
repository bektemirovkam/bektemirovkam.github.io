const declension = (forms: string[], val: number) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return forms[
    val % 100 > 4 && val % 100 < 20 ? 2 : cases[val % 10 < 5 ? val % 10 : 5]
  ];
};

export const getCorrectVariant = (stops: number) => {
  const ref_days = declension(["пересадка", "пересадки", "пересадок"], stops);
  return ref_days;
};

export const formatDate = (value: string | number) => {
  const startDate = new Date(value);

  const hourse = startDate.getHours();
  const minutes = startDate.getMinutes();

  return `${hourse > 9 ? hourse : `0${hourse}`}:${
    minutes > 9 ? minutes : `0${minutes}`
  }`;
};

export const getEndTravelTime = (start: string, endTimeInMinutes: number) => {
  const startDate = new Date(start).getTime();
  const endDate = new Date(startDate + endTimeInMinutes * 60 * 1000).getTime();
  return formatDate(endDate);
};

export const getTimeFromMins = (mins: number) => {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  return hours + "ч " + minutes + "м";
};
