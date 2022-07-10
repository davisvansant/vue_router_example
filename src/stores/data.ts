import { defineStore } from "pinia";

interface Data {
  authenticated: boolean;
  username: string;
  password: string;
}

const data: Data = {
  authenticated: false,
  username: "",
  password: "",
};

const useDataStore = defineStore({
  id: "data",
  state: () => ({
    data,
  }),
});

export default useDataStore;
