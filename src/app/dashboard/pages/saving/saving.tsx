import { useAppSelector } from "../../../store/user/hooks";
import MoneyDisplay from "../../components/money-display/money-display";
import { PageBlock } from "../../components/page-block/page-block";
import { PageTitleBlock } from "../../components/page-title-block/page-title-block";
import "./saving.scss";

export const Saving: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <PageBlock>
      <div className="saving">
        <PageTitleBlock
          title="Ma caisse d'epargne"
          subtitle="Historique des transactions"
        />
        <div className="elevation-1 mt-4 rounded-4 p-4 sold-object-block">
          <h5 className="mb-2 title">Mon solde</h5>
          <div className="d-flex align-items-center content">
            <span className="material-symbols-rounded money-icon">euro</span>
            <div className="text-block">
              <div className="mb-1 sold-object">
                <span className="sold">
                  <MoneyDisplay amount={user.amount} />
                </span>
                <span className="object">
                  {" "}
                  <MoneyDisplay amount={user.target ? user.target * 6 : 0} />
                </span>
              </div>
              <div className="level">
                <span className="percentage">
                  {user.amount && user.target
                    ? (user.amount * 100) / user.target
                    : 0}{" "}
                  %
                </span>{" "}
                Niveau
              </div>
              <div className="recap-text">
                Votre objectif d'epargne durant les 6 prochaines mois est de{" "}
                <span className="object">
                  <MoneyDisplay amount={user.target ? user.target * 6 : 0} />
                </span>
                .
              </div>
            </div>
          </div>
        </div>
        <div className="elevation-1 mt-5 rounded-4 p-4 history-block">
          <h5 className="mb-2 title">Historique</h5>
          <div className="content">
            <h6>Aucune transaction effectué pour le moment</h6>
          </div>
        </div>
      </div>
    </PageBlock>
  );
};
