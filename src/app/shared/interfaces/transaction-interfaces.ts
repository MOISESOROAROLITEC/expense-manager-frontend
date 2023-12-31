export interface Transaction {
  id: number;
  amount: number;
  accountType: "Bank" | "Bourse" | "BoxMoney";
  transactionType: "Debit" | "Credit";
  subject?: string;
  date: Date | number | string;
  deletedAt?: Date | number | string;
}

export interface MakeTransactionInterface {
  transactionType: transactionTypeEnum;
  accountType: accountTypeEnum;
  amount: number;
  date: Date | number | string;
  subject?: string;
}

export interface MakeTransactionResponseInterface {
  createTransaction: Transaction;
}
export interface RemoveTransactionResponseInterface {
  removeTransaction: Transaction;
}

export enum accountTypeEnum {
  "Bank",
  "Bourse",
  "BoxMoney",
}

export enum transactionTypeEnum {
  "Debit",
  "Credit",
}

export interface TransactionsResponseInterface {
  totalCount: number;
  transactions: Transaction[];
}
