import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../shared/interfaces/user-interfaces";
import { RootState } from "../store";

export const getInitialName = (name: string) => {
  const sname = name.split(" ");
  let firstLatter = "";
  for (let i = 0; i < sname.length; i++) {
    firstLatter = firstLatter + sname[i][0]?.toUpperCase();
  }
  return firstLatter;
};

export const getFirstName = (name: string): string => {
  return name.split(" ")[0];
};

interface initialStateInterface extends User {
  userFirstName: string;
  userInitial: string;
}

const initialState: initialStateInterface = {
  name: "",
  email: "",
  amount: 0,
  target: 0,
  birthDay: "",
  userFirstName: "",
  userInitial: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserAction: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setTargetAction: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        target: action.payload,
      };
    },
    setUsernameAction: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        name: action.payload,
      };
    },
    setInitialAction: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        userInitial: getInitialName(action.payload).toUpperCase(),
      };
    },
    setFirstNameAction: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        userFirstName: getFirstName(action.payload).toUpperCase(),
      };
    },
    setTokenAction: (state, action) => {
      return {
        ...state,
        token: action.payload,
      };
    },
  },
});

export const {
  updateUserAction,
  setUsernameAction,
  setTokenAction,
  setInitialAction,
  setFirstNameAction,
  setTargetAction,
} = userSlice.actions;

export const selectCount = (state: RootState) => state.user;
