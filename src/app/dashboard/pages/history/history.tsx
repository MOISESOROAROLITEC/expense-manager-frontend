import React from "react";
import "./history.scss";
import { PageTitleBlock } from "../../components/page-title-block/page-title-block";
import { PageBlock } from "../../components/page-block/page-block";
import { TransactionTable } from "../../components/transactions-table/transactions-table";
import { useAppSelector } from "../../../store/hooks";

export const History: React.FC = () => {
  const transactionResponse = useAppSelector((store) => store.transactions);
  return (
    <PageBlock>
      <div className="historique">
        <PageTitleBlock
          title="Historique des transactions"
          subtitle="Liste de toute vos transactions"
        />
        <TransactionTable transactionResponse={transactionResponse} />
      </div>
    </PageBlock>
  );
};
