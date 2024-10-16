import DonutChart from "./DonutChart/DonutChart";
import { useEffect, useState } from "react";
import "./MainPage.scss";
import StaticCards from "./StaticCards/StaticCards";
import Compitents from "./Compitents/Compitents";
import RaitingDinamics from "./RaitingDinamics/RaitingDinamics.tsx";
import SkillsTable from "./SkillsTable/SkillsTable.tsx";
import { BASE_URL } from "../utils/constants.ts";
import { IEmployees, ITeam } from "../utils/types.ts";

const gradesData = [
  { name: "25% Junior", value: 25 },
  { name: "46% Middle", value: 46 },
  { name: "22% Senior", value: 22 },
];
const gradesColors = ["#008E74", "#B342E8", "#08AEAE"];
const skillsData = [
  { name: "15% Не владеет", value: 15 },
  { name: "31% Начальный", value: 31 },
  { name: "9% Базовый", value: 9 },
  { name: "19% Уверенный", value: 19 },
  { name: "20% Эксперт", value: 20 },
];
const skillsColors = [
  "#E10D34",
  "#008E74",
  "#24E7E5",
  "#B342E8",
  "#08AEAE",
  "#221670",
];

interface IProps {
  fetchedData: IEmployees[]
  setFetchedData: (data:IEmployees[]) => void
}

function MainPage({fetchedData, setFetchedData} :IProps) {
  const [teamsList, setTeamsList] = useState<ITeam[]>([]);
  const [currentTeam, setCurrentTeam] = useState<ITeam>();

  const busFactorTrue = fetchedData.filter(employee => employee.bus_factor === true).length;
  const totalRequestsByEmployee = fetchedData.reduce((sum, employee) => sum + employee.requests_by_employee, 0);
  const developmentPlanTrue = fetchedData.filter(employee => employee.development_plan === true).length;

  useEffect(() => {
    fetch(`${BASE_URL}/teams-list/`)
      .then((response) => response.json())
      .then((data) => {
        setTeamsList(data);
        setCurrentTeam(data[0]);
      })
      .catch((res) => {
        console.log("Ошибка при получении данных:", res.message);
      });
  }, []);

  useEffect(() => {
    if (currentTeam) {
      fetch(`${BASE_URL}/employees/?team=${currentTeam.id}`)
        .then((response) => response.json())
        .then((data) => {
          setFetchedData(data);
        })
        .catch((res) => {
          console.log("Ошибка при получении данных:", res.message);
        });
    }
  }, [currentTeam]);

  if (!currentTeam) return <div>Идет загрузка...</div>;

  return (
    <main className="main">
      <section className="main__title-group">
        <h2 className="main__title">Аналитика навыков</h2>
        <span className="main__title-span">{fetchedData.length} сотрудников</span>
      </section>
      <section className="analyst">
        <StaticCards totalEmployees={fetchedData.length} developmentPlanTrue={developmentPlanTrue} busFactorTrue={busFactorTrue} totalRequestsByEmployee={totalRequestsByEmployee} />
        <DonutChart
          data={gradesData}
          colors={gradesColors}
          title="Распределение по грейдам"
        />
        <DonutChart
          data={skillsData}
          colors={skillsColors}
          title="Распределение по владению навыками"
        />
      </section>
      <section className="analyst">
        <Compitents />
        <RaitingDinamics />
      </section>
      <section className="table">
        <SkillsTable
          employees={fetchedData}
          teams={teamsList}
          currentTeam={currentTeam}
          setCurrentTeam={setCurrentTeam}
        />
      </section>
    </main>
  );
}

export default MainPage;
