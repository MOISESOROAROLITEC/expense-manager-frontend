import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../../shared/interfaces/transaction-interfaces";

interface TransactionsStateInterface {
  totalCount: number;
  transactions: Transaction[];
}

const initialTransactionsState: TransactionsStateInterface = {
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
      action: PayloadAction<TransactionsStateInterface>
    ) => {
      return { ...state, ...action.payload };
    },
    addTransactionAction: (state, action: PayloadAction<Transaction>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateTransactionsAction, addTransactionAction } =
  transactionsSlice.actions;
