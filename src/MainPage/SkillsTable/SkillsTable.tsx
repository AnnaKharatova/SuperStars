import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./SkillsTable.scss";
import DownloadDashbord from "../../DownloadDashbord/DownloadDashbord";
import defaultPhoto from "../../assets/images/photo-default.svg";
import MyTooltip from "../../MyTooltip/MyTooltip";
import progressUp from "../../assets/icons/progress-arrow-up.svg";
import progressDown from "../../assets/icons/progress-arrow-down.svg";

import { IEmployees, ITeam } from "../../utils/types.ts";

interface IProps {
  employees: IEmployees[];
  teams: ITeam[];
  currentTeam: ITeam;
  setCurrentTeam: (team: ITeam) => void;
}

const SkillsTable = ({
  employees,
  teams,
  currentTeam,
  setCurrentTeam,
}: IProps) => {
  const [hardSkills, setHardSkills] = useState<boolean>(true);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [softSkillsList, setSoftSkillsList] = useState<string[]>([]);
  const [hardSkillsList, setHardSkillsList] = useState<string[]>([]);

  useEffect(() => {
    if (employees) {
      const softList = Array.from(
        new Set(
          employees?.flatMap((item) =>
            item.skills?.soft_skills?.map((item) => item.name),
          ),
        ),
      );

      setSoftSkillsList(softList);

      const hardList = Array.from(
        new Set(
          employees?.flatMap((item) =>
            item.skills?.hard_skills?.map((item) => item.name),
          ),
        ),
      );

      setHardSkillsList(hardList);
    }
  }, [employees]);

  console.log(employees);

  function handleSoftSkills() {
    setHardSkills(false);
  }

  function handleHardSkills() {
    setHardSkills(true);
  }

  const handleMouseOver = (index: string) => {
    setShowTooltip(index);
  };

  const handleMouseOut = () => {
    setShowTooltip(null);
  };

  const handleSort = (skill: string) => {
    console.log("здесь могла бы быть сортировка по", { skill });
  };

  console.log(employees);

  if (!employees) return <div>Загрузка данных...</div>;

  return (
    <>
      <div className="skills__header">
        <div className="skills__download">
          <DownloadDashbord minimalism={true} />
        </div>
        <h2 className="skills__title">Текущая экспертная оценка навыков</h2>
        <div className="skills__buttons">
          <button
            className={`skills__skills-button ${hardSkills ? "skills__skills-button_active" : ""}`}
            onClick={handleHardSkills}
          >
            Hard skills
          </button>
          <button
            className={`skills__skills-button  ${!hardSkills ? "skills__skills-button_active" : ""}`}
            onClick={handleSoftSkills}
          >
            Soft skills
          </button>
        </div>
        <div className="skills__buttons skills__buttons-teams">
          {teams.map((team) => (
            <button
              key={uuidv4()}
              className={`skills__skills-button ${currentTeam.name == team.name ? "skills__skills-button_active" : ""}`}
              onClick={() => {
                setCurrentTeam(team);
              }}
            >
              {team.name}
            </button>
          ))}
        </div>
      </div>

      <div className="table__container">
        <div className="table__team">
          <h4 className="table__header">Команда</h4>
          <p className="table__team-name">{currentTeam?.name}</p>
        </div>
        <div className="table__main">
          <table>
            <thead>
              <tr>
                <th className="table__employeer">
                  Сотрудник
                  <button
                    className="table__sort-button"
                    onMouseOver={() => handleMouseOver("159")}
                    onMouseOut={handleMouseOut}
                    onClick={() => handleSort("Сотрудник")}
                  ></button>
                  <MyTooltip
                    showTooltip={showTooltip === "159"}
                    text="Сортировка"
                  />
                </th>
                <th className="table__raiting">
                  Рейтинг
                  <button
                    className="table__sort-button"
                    onMouseOver={() => handleMouseOver("147")}
                    onMouseOut={handleMouseOut}
                    onClick={() => handleSort("Рейтинг")}
                  ></button>
                  <MyTooltip
                    showTooltip={showTooltip === "147"}
                    text="Сортировка"
                  />
                </th>
                {hardSkills &&
                  hardSkillsList.map((skillName, index) => (
                    <th key={uuidv4()} className="table__skill">
                      <div className="table__skill-container">
                        <p className="table__skill-text">{skillName}</p>
                        <button
                          className="table__sort-button"
                          onMouseOver={() => handleMouseOver(String(index))}
                          onMouseOut={handleMouseOut}
                          onClick={() => handleSort(skillName)}
                        ></button>
                        <MyTooltip
                          showTooltip={showTooltip === String(index)}
                          text="Сортировка"
                        />
                      </div>
                    </th>
                  ))}
                {!hardSkills &&
                  softSkillsList.map((skillName, index) => (
                    <th key={uuidv4()} className="table__skill">
                      <div className="table__skill-container">
                        <p className="table__skill-text">{skillName}</p>
                        <button
                          className="table__sort-button"
                          onMouseOver={() => handleMouseOver(String(index))}
                          onMouseOut={handleMouseOut}
                          onClick={() => handleSort(skillName)}
                        ></button>
                        <MyTooltip
                          showTooltip={showTooltip === String(index)}
                          text="Сортировка"
                        />
                      </div>
                    </th>
                  ))}
              </tr>
            </thead>

            <tbody>
              {employees?.map((item, index) => (
                <tr className="table__row" key={uuidv4()}>
                  <td className="employee">
                    <div>{index + 1}</div>
                    <img
                      className={
                        !item.bus_factor
                          ? "employee__image"
                          : "employee__image_true"
                      }
                      src={item.image ? item.image : defaultPhoto}
                      onMouseOver={() => handleMouseOver(index + "bus-factor")}
                      onMouseOut={handleMouseOut}
                    />
                    {item.bus_factor && (
                      <MyTooltip
                        showTooltip={
                          showTooltip === String(index + "bus-factor")
                        }
                        text={"Bus Factor"}
                      />
                    )}
                    <div className="employee__about">
                      <p className="employee__name">{item.name}</p>
                      <p className="employee__position">{`${item.position}, ${item.grade}`}</p>
                    </div>
                  </td>
                  <td>
                    <div className="employee__raiting">99/100</div>
                  </td>
                  {hardSkills &&
                    item.skills.hard_skills.map((i) => (
                      <td key={uuidv4()}>
                        <div className="employee__score">
                          <img
                            className="employee__score-progress"
                            src={i.growth ? progressUp : progressDown}
                            alt="прогресс"
                          />
                          <p
                            className={
                              i.accordance == true
                                ? "employee__score-value"
                                : "employee__score-value employee__score-value_true "
                            }
                          >
                            {i.score}
                          </p>
                        </div>
                      </td>
                    ))}
                  {!hardSkills &&
                    item.skills.soft_skills.map((i) => (
                      <td key={uuidv4()}>
                        <div className="employee__score">
                          <img
                            className="employee__score-progress"
                            src={i.growth ? progressUp : progressDown}
                            alt="прогресс"
                          />
                          <p
                            className={
                              i.accordance === true
                                ? "employee__score-value"
                                : "employee__score-value employee__score-value_true "
                            }
                          >
                            {i.score}
                          </p>
                        </div>
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SkillsTable;
