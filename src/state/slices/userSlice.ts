import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  value: number[];
}

const initialState: UserState = {
  value: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      if (state.value.length === 0) {
        state.value.push(0);
      } else {
        state.value.push(state.value[state.value.length - 1] + action.payload);
      }
    },
    // setUser : {}
  },
});

export const { add } = userSlice.actions;

export default userSlice.reducer;
