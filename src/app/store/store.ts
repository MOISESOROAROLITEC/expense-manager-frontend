import { configureStore } from "@reduxjs/toolkit";
import { lastFiveTransactionsSlice } from "./last-five-transactions/slice";
import { transactionsSlice } from "./transactions/slice";
import { userSlice } from "./user/slice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    transactions: transactionsSlice.reducer,
    lastFiveTransactions: lastFiveTransactionsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
