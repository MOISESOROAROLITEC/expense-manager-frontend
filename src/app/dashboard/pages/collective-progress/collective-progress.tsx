import React from "react";
import { PageBlock } from "../../components/page-block/page-block";
import { PageTitleBlock } from "../../components/page-title-block/page-title-block";

const CollectiveProgress: React.FC = () => {
  return (
    <PageBlock>
      <div className="collective-progress">
        <PageTitleBlock
          title="Liste de tous les participants au challenge"
          subtitle="Visualiser l'evolution des autres membres"
        />
      </div>
    </PageBlock>
  );
};

export default CollectiveProgress;
