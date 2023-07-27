import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../shared/user-interface/interface";
import { RootState } from "../store";

export const getInitialName = (name: string) => {
  const sname = name.split(" ");
  let firstLatter = "";
  for (let i = 0; i < sname.length; i++) {
    firstLatter = firstLatter + sname[i][0]?.toUpperCase();
  }
  return firstLatter;
};

const initialState: User = {
  name: "",
  email: "",
  birthDay: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setUsername: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        name: action.payload,
      };
    },
    setToken: (state, action) => {
      return {
        ...state,
        token: action.payload,
      };
    },
  },
});

export const { updateUser, setUsername, setToken } = userSlice.actions;

export const selectCount = (state: RootState) => state.user;

// export default userSlice.reducer;
