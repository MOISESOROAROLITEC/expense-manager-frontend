import { useMutation } from "@apollo/client";
import { Tooltip } from "@mui/material";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { catchRequestError } from "../../../auth/auth.service";
import {
  RemoveTransactionResponseInterface,
  TransactionsResponseInterface,
} from "../../../shared/interfaces/transaction-interfaces";
import { displayAccountNameFromType } from "../../../shared/utilities/display-account-name-from-type";
import { removeTransactionGraphQL } from "../../../shared/utilities/graphql-request";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { updateUserAction } from "../../../store/user/slice";
import { updateRemovedTransactionAction } from "../../../store/transactions/slice";
import { FormatingDate } from "../formating-date/formating-date";
import MoneyDisplay from "../money-display/money-display";
import "./transactions-table.scss";

export const TransactionTable: React.FC<{
  transactionResponse: TransactionsResponseInterface;
  limit?: number;
}> = ({ transactionResponse, limit }) => {
  const transactions = transactionResponse.transactions.slice(0, limit);
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);
  const [removeTransaction] = useMutation<RemoveTransactionResponseInterface>(
    removeTransactionGraphQL
  );

  async function handleRemoveTransaction(id: number) {
    try {
      const transactionRemoved = await removeTransaction({
        variables: { id: +id },
      });
      const transactionRemovedData = transactionRemoved.data?.removeTransaction;
      if (transactionRemovedData) {
        dispatch(updateRemovedTransactionAction(transactionRemovedData));

        let newUserAmount: number;
        if (transactionRemovedData.transactionType === "Credit") {
          newUserAmount = user.amount - transactionRemovedData.amount;
        } else {
          newUserAmount = user.amount + transactionRemovedData.amount;
        }
        dispatch(updateUserAction({ ...user, amount: newUserAmount }));
      } else {
        catchRequestError(transactionRemoved);
      }
    } catch (error) {
      catchRequestError(error);
    }
  }

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
                <td> {displayAccountNameFromType(transaction.accountType)} </td>
                <td>
                  {" "}
                  <MoneyDisplay amount={transaction.amount} />{" "}
                </td>
                <td>
                  {" "}
                  {transaction.subject === "" ? (
                    <span className="subject-not-defined">
                      Motif non défini
                    </span>
                  ) : (
                    transaction.subject
                  )}{" "}
                </td>
                <td>
                  {" "}
                  <FormatingDate date={transaction.date} />
                </td>
                <td>
                  {transaction.deletedAt ? (
                    <div className="chip-box d-flex justify-content-center">
                      {" "}
                      <Chip label="annulée" color="warning" size="small" />
                    </div>
                  ) : (
                    <div className="cancel-icon-box d-flex">
                      <Tooltip title="Annuler la transaction" color="error">
                        <IconButton
                          className="p-0 cancel-icon-btn"
                          onClick={() =>
                            handleRemoveTransaction(transaction.id)
                          }
                          aria-label="delete"
                          color="warning"
                        >
                          <span className="material-symbols-rounded cancel-icon-btn-span">
                            close
                          </span>
                        </IconButton>
                      </Tooltip>
                    </div>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {transactionResponse.totalCount === 0 && (
        <h5 className="w-100 mt-4 text-center">
          Aucune transaction Effectué pour le moment
        </h5>
      )}
    </div>
  );
};
