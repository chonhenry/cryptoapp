import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getCryptos as fetchCryptos } from "../../API/CryptoApi";
import { Crypto } from "../../API/CryptoApi";

interface CryptosState {
  list: Crypto[];
  status: string;
}

const initialState: CryptosState = {
  list: [],
  status: "loading",
};

export enum CryptosStatus {
  LOADING = "loading",
  SUCCESS = "success",
  FAILED = "failed",
}

export const getCryptos = createAsyncThunk("cryptos/fetchCryptos", async () => {
  return fetchCryptos()
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw Error(error.message);
    });
});

export const cryptoSlice = createSlice({
  name: "cryptos",
  initialState,
  reducers: {},
  extraReducers: {
    [getCryptos.pending.toString()]: (
      state: CryptosState,
      action: PayloadAction
    ) => {
      state.status = "loading";
    },
    [getCryptos.fulfilled.toString()]: (
      state: CryptosState,
      action: PayloadAction<Crypto[]>
    ) => {
      state.list = action.payload;
      state.status = "success";
    },
    [getCryptos.rejected.toString()]: (
      state: CryptosState,
      action: PayloadAction
    ) => {
      state.status = "failed";
    },
  },
});

export default cryptoSlice.reducer;
