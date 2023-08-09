export interface MakeTransactionInterface {
  transactionType: transactionTypeEnum;
  accountType: accountTypeEnum;
  amount: number;
  date: Date | number | string;
  subject?: string;
}

export interface MakeTransactionResponseInterface {
  createTransaction: {
    transactionType: "Debit" | "Credit";
    accountType: "Bank" | "Bourse" | "BoxMoney";
    amount: number;
    date: Date | number | string;
    subject?: string;
    id: number;
  };
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
