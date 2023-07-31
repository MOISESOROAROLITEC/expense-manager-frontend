import "./saving.scss";

export const Saving: React.FC = () => {
  return (
    <div className="elevation-3 p-4 rounded-3 saving">
      <div className="saving-title-subtitle">
        <h4 className="mb-0 title">Ma caisse d'epargne</h4>
        <div className="subtitle">Historique des transactions</div>
      </div>
      <div className="elevation-1 mt-4 rounded-4 p-4 sold-object-block">
        <h5 className="mb-2 title">Mon solde</h5>
        <div className="d-flex align-items-center content">
          <span className="material-symbols-rounded money-icon">euro</span>
          <div className="text-block">
            <div className="mb-1 sold-object">
              <span className="sold">0 FCFA</span>
              <span className="object"> / 240 000 FCFA</span>
            </div>
            <div className="level">
              <span className="percentage">0 %</span> Niveau
            </div>
            <div className="recap-text">
              Votre objectif d'epargne durant les 6 prochaines mois est de{" "}
              <span className="object">240 000 FCFA</span>.
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
  );
};
