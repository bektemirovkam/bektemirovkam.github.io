import { axios } from "../api/axios";
import { IGetSearchIdResp, IGetTicketsResp } from "../models/Search";

const searchAPI = {
  getSearchId: async () => {
    const { data } = await axios.get<IGetSearchIdResp>("search");
    return data;
  },

  getTickets: async (searchId: string) => {
    const { data } = await axios.get<IGetTicketsResp>(
      `tickets?searchId=${searchId}`
    );
    return data;
  },
};

export default searchAPI;
