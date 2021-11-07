import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getCryptos as fetchCryptos } from "../../API/CryptoApi";

export const getCryptos = createAsyncThunk("cryptos/fetchCryptos", async () => {
  console.log("fetchCryptos");
  return fetchCryptos().then((res) => {
    return res;
  });
});

export const cryptoSlice = createSlice({
  name: "cryptos",
  initialState: {
    list: [],
    status: null,
  },
  reducers: {},
  extraReducers: {
    [getCryptos.pending.toString()]: (state: any, action: PayloadAction) => {
      state.status = "loading";
    },
    [getCryptos.fulfilled.toString()]: (state: any, action: PayloadAction) => {
      state.list = action.payload;
      state.status = "success";
    },
    [getCryptos.rejected.toString()]: (state: any, action: PayloadAction) => {
      state.status = "failed";
    },
  },
});

export default cryptoSlice.reducer;
