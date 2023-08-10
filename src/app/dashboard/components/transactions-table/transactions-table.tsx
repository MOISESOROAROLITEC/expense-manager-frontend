import React from "react";
import { TransactionsResponseInterface } from "../../../shared/interfaces/transaction-interfaces";
import { FormatingDate } from "../formating-date/formating-date";
import MoneyDisplay from "../money-display/money-display";
import "./transactions-table.scss";

export const TransactionTable: React.FC<{
  transactionResponse: TransactionsResponseInterface;
  limit?: number;
}> = ({ transactionResponse, limit }) => {
  const transactions = transactionResponse.transactions.slice(0, limit);
  return (
    <div className="transaction-table">
      <table className="mt-4 table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Type</th>
            <th scope="col">Compte</th>
            <th scope="col">Montant</th>
            <th scope="col">Motif</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {transactionResponse.totalCount !== 0 &&
            transactions.map((transaction, index) => (
              <tr key={transaction.id}>
                <th scope="row"> {index + 1} </th>
                <td> {transaction.transactionType} </td>
                <td> {transaction.accountType} </td>
                <td>
                  {" "}
                  <MoneyDisplay amount={transaction.amount} />{" "}
                </td>
                <td>
                  {" "}
                  {transaction.subject === "" ? (
                    <span className="subject-not-defined">
                      motif non défini
                    </span>
                  ) : (
                    transaction.subject
                  )}{" "}
                </td>
                <td>
                  {" "}
                  <FormatingDate date={transaction.date} />
                </td>
                <td> {transaction.id} </td>
              </tr>
            ))}
        </tbody>
      </table>
      {transactionResponse.totalCount === 0 && (
        <h4 className="w-100 text-center">
          Aucune transaction Effectué pour le moment
        </h4>
      )}
    </div>
  );
};
