import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cryptosReducer from "./slices/cryptosSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cryptos: cryptosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
