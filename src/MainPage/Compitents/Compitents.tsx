import "./Compitents.scss";
import { useState } from "react";
import {
  LineChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  ResponsiveContainer,
  YAxis,
  Legend,
  Line,
} from "recharts";
import DownloadDashbord from "../../DownloadDashbord/DownloadDashbord";
import MyTooltip from "../../MyTooltip/MyTooltip";
import LineTooltip from "../LineTooltip/LineTooltip";
export const data = [
  {
    name: "2014-08-05",
    uv: 4,
    pv: 3,
    amt: 2,
  },
  {
    name: "2023-02-17",
    uv: 3,
    pv: 2,
    amt: 3,
  },
  {
    name: "2023-07-3",
    uv: 2,
    pv: 1,
    amt: 2,
  },
  {
    name: "2024-02-04",
    uv: 2,
    pv: 3,
    amt: 2,
  },
];

function Compitents() {
  const [hardSkills, setHardSkills] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  function handleSoftSkills() {
    setHardSkills(false);
  }

  function handleHardSkills() {
    setHardSkills(true);
  }

  function handleLineClick() {
    console.log("click");
  }

  const handleMouseOver = () => {
    setShowTooltip(true);
  };

  const handleMouseOut = () => {
    setShowTooltip(false);
  };

  function handleLegentClick() {
    console.log("legend");
  }

  return (
    <div className="compitents">
      <div className="compitents__header">
        <div className="compitents__download">
          <DownloadDashbord minimalism={true} />
        </div>
        <h2 className="compitents__title">Динамика оценки компетенций</h2>
        <div className="compitents__buttons">
          <button
            className={`compitents__skills-button ${hardSkills ? "compitents__skills-button_active" : ""}`}
            onClick={handleHardSkills}
          >
            Hard skills
          </button>
          <button
            className={`compitents__skills-button  ${!hardSkills ? "compitents__skills-button_active" : ""}`}
            onClick={handleSoftSkills}
          >
            Soft skills
          </button>
          <button
            data-tooltip-id="compitents-tooltip"
            className="compitents__question-button"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          ></button>
          <MyTooltip
            showTooltip={showTooltip}
            text="График можно детализировать по любой из компетенций при клике на соответствующую линию компетенции или её название в легенде"
          />
        </div>
      </div>
      <div className="compitents__caption">Средняя оценка</div>
      <ResponsiveContainer>
        <LineChart
          width={730}
          height={350}
          data={data}
          margin={{ top: 5, right: 10, left: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tickFormatter={(value: string) => {
              return value || "N/A";
            }}
          />

          <YAxis
            type="number"
            domain={[1, "dataMax"]}
            interval={0}
            tickFormatter={(value) => {
              return value.toFixed(2);
            }}
          />
          <Tooltip content={<LineTooltip name={"название ветки"} />} />
          <Legend
            onClick={handleLegentClick}
            payload={[
              {
                value: "Анализ данных и применение методов машинного обучения",
                color: "#8884d8",
              },
              { value: "Базы данных", color: "#82ca9d" },
              { value: "Иностранные языки", color: "#82ca9d" },
            ]}
          />
          {hardSkills ? (
            <>
              <Line
                name="Анализ данных и применение методов машинного обучения"
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                onClick={handleLineClick}
              ></Line>
              <Line
                name="Базы данных"
                type="monotone"
                dataKey="uv"
                stroke="#82ca9d"
              />
              <Line
                name="Иностранные языки"
                type="monotone"
                dataKey="amt"
                stroke="#82ca9d"
              />
            </>
          ) : (
            <>
              <Line
                name="Обучаемость"
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                onClick={handleLineClick}
              />
              <Line
                name="Многозадачность"
                type="monotone"
                dataKey="uv"
                stroke="#82ca9d"
              />
              <Line
                name="Креативность"
                type="monotone"
                dataKey="amt"
                stroke="#82ca9d"
              />
              <Line
                name="Стрессоустойчивость"
                type="monotone"
                dataKey="amt"
                stroke="#82ca9d"
              />
              <Line
                name="Оптимистичность"
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                onClick={handleLineClick}
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Compitents;
