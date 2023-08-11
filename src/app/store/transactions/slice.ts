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
    updateRemovedTransactionAction: (
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
  updateTransactionsAction,
  addTransactionAction,
  updateRemovedTransactionAction,
} = transactionsSlice.actions;
