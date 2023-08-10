import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Transaction,
  TransactionsResponseInterface,
} from "../../shared/interfaces/transaction-interfaces";

const initialTransactionsState: TransactionsResponseInterface = {
  totalCount: 0,
  transactions: [
    {
      id: 0,
      amount: 0,
      accountType: "Bank",
      transactionType: "Debit",
      subject: "",
      date: "",
    },
  ],
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: initialTransactionsState,
  reducers: {
    updateTransactionsAction: (
      state,
      action: PayloadAction<TransactionsResponseInterface>
    ) => {
      return { ...state, ...action.payload };
    },
    addTransactionAction: (state, action: PayloadAction<Transaction>) => {
      return {
        ...state,
        totalCount: state.totalCount + 1,
        transactions: [action.payload, ...state.transactions],
      };
    },
  },
});

export const { updateTransactionsAction, addTransactionAction } =
  transactionsSlice.actions;
