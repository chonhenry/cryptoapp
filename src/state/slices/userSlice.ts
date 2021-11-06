import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import firebase from "firebase/app";

// interface UserState {
//   value: number[];
// }

export interface User {
  id: string;
  displayName: string;
  email: string;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
