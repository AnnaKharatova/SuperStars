import "./StaticCards.scss";
import { Link } from "react-router-dom";

interface IProps {
  busFactorTrue: number;
  totalRequestsByEmployee: number;
  developmentPlanTrue: number;
  totalEmployees: number;
}

function StaticCards({
  totalEmployees,
  developmentPlanTrue,
  busFactorTrue,
  totalRequestsByEmployee,
}: IProps) {
  return (
    <ul className="static-cards">
      <li className="static-card">
        <div className="static-card__value">{busFactorTrue}</div>
        <h3 className="static-card__title">Bus factor</h3>
      </li>
      <li className="static-card">
        <div className="static-card__data">
          <div className="static-card__value">62%</div>
        </div>
        <h3 className="static-card__title">соответствие текущей роли</h3>
      </li>
      <li className="static-card">
        <Link className="static-card__link" to="/training-request">
          <div className="static-card__value">{totalRequestsByEmployee}</div>
          <h3 className="static-card__title">запросов на обучение</h3>
        </Link>
      </li>
      <li className="static-card static-card__progress-bar">
        <div className="static-card__value">
          {developmentPlanTrue}/{totalEmployees}
        </div>
        <h3 className="static-card__title">Планы развития</h3>
        <div>
          <h3 className="static-card__title"></h3>
        </div>
      </li>
    </ul>
  );
}

export default StaticCards;
