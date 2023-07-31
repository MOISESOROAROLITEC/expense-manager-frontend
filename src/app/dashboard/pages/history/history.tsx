import React from "react";
import "./history.scss";
import { PageTitleBlock } from "../../components/page-title-block/page-title-block";
import { PageBlock } from "../../components/page-block/page-block";

export const History: React.FC = () => {
  return (
    <PageBlock>
      <div className="historique">
        <PageTitleBlock
          title="Historique des transactions"
          subtitle="Liste de toute vos transactions"
        />
        <table className="mt-4 table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Type</th>
              <th scope="col">Compte</th>
              <th scope="col">Montant</th>
              <th scope="col">Motif</th>
              <th scope="col">Date</th>
              <th scope="col">Solde</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Achat d'une voiture</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </PageBlock>
  );
};
