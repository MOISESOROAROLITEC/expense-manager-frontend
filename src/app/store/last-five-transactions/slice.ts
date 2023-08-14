import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Transaction,
  TransactionsResponseInterface,
} from "../../shared/interfaces/transaction-interfaces";

const initialLastFiveTransactionsState: TransactionsResponseInterface = {
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

export const lastFiveTransactionsSlice = createSlice({
  name: "lastFiveTransactions",
  initialState: initialLastFiveTransactionsState,
  reducers: {
    updateLastFiveTransactionsAction: (
      state,
      action: PayloadAction<TransactionsResponseInterface>
    ) => {
      return { ...state, ...action.payload };
    },
    addLastFiveTransactionAction: (
      state,
      action: PayloadAction<Transaction>
    ) => {
      return {
        ...state,
        totalCount: state.totalCount + 1,
        transactions: [action.payload, ...state.transactions],
      };
    },
    updateRemovedLastFiveTransactionAction: (
      state,
      action: PayloadAction<Transaction>
    ) => {
      const updateTransactions = state.transactions.map((transaction) => {
        if (transaction.id === action.payload.id) {
          return { ...transaction, deletedAt: action.payload.deletedAt };
        }
        return transaction;
      });
      return { ...state, transactions: updateTransactions };
    },
  },
});

export const {
  updateLastFiveTransactionsAction,
  addLastFiveTransactionAction,
  updateRemovedLastFiveTransactionAction,
} = lastFiveTransactionsSlice.actions;
