import React, { useEffect, useState } from "react";
import { PageTitleBlock } from "../../components/page-title-block/page-title-block";
import { PageBlock } from "../../components/page-block/page-block";
import { TransactionTable } from "../../components/transactions-table/transactions-table";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Pagination from "@mui/material/Pagination";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useLazyQuery } from "@apollo/client";
import { getUserTransactionsGraphQL } from "../../../shared/utilities/graphql-request";
import { UserResponse } from "../../../shared/interfaces/user-interfaces";
import "./history.scss";
import { updateTransactionsAction } from "../../../store/transactions/slice";

export const History: React.FC = () => {
  const transactionResponse = useAppSelector((store) => store.transactions);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const pageNumber = Math.ceil(transactionResponse.totalCount / pageSize);
  const pageSizes = [5, 10, 30, 50, 75, 100];
  const dispatch = useAppDispatch();
  const [getTransactions] = useLazyQuery<UserResponse>(
    getUserTransactionsGraphQL
  );

  function handleChangeCurrentPage(
    _: React.ChangeEvent<unknown>,
    value: number
  ) {
    setCurrentPage(value);
  }

  function handleChangePageSize(e: SelectChangeEvent<number>) {
    const value = +e.target.value;
    const newPageSize = transactionResponse.totalCount / value;
    if (newPageSize < currentPage) {
      setCurrentPage(1);
    }
    setPageSize(value);
  }

  useEffect(() => {
    const getUserInfos = async () => {
      try {
        const transactions = await getTransactions({
          variables: {
            pageSize: pageSize,
            offset: (currentPage - 1) * pageSize,
          },
          fetchPolicy: "no-cache",
        });
        const transactionsDatas = transactions.data?.user.transactions;
        if (transactionsDatas) {
          dispatch(updateTransactionsAction(transactionsDatas));
        }
      } catch (error) {}
    };
    getUserInfos();
  }, [pageSize, currentPage, dispatch, getTransactions]);

  return (
    <PageBlock>
      <div className="historique">
        <PageTitleBlock
          title="Historique des transactions"
          subtitle="Liste de toute vos transactions"
        />
        <TransactionTable
          transactionResponse={transactionResponse}
          limit={pageSize}
        />
        <div className="mt-4 pagination ">
          <FormControl sx={{ m: 2, minWidth: 170 }} size="small">
            <InputLabel id="page-size">Nombre de transactions</InputLabel>
            <Select
              labelId="page-size"
              id="page-size-id"
              value={pageSize}
              label="  Nombre de transactions"
              onChange={handleChangePageSize}
            >
              {pageSizes.map((value) => (
                <MenuItem key={value} value={value}>
                  {" "}
                  {value}{" "}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Pagination
            count={pageNumber}
            siblingCount={2}
            page={currentPage}
            boundaryCount={1}
            onChange={handleChangeCurrentPage}
          />
        </div>
      </div>
    </PageBlock>
  );
};
