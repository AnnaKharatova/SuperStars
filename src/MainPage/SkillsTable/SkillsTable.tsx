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
  const [displayedEmployees, setDisplayedEmployees] = useState<IEmployees[]>(
    [],
  );
  const [sortDirections, setSortDirections] = useState(
    Array(softSkillsList.length).fill("asc"),
  );

  console.log(employees);

  useEffect(() => {
    setDisplayedEmployees(employees);
  }, [employees]);

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

  const handleMouseOver = (index: string) => {
    setShowTooltip(index);
  };

  const handleMouseOut = () => {
    setShowTooltip(null);
  };

  const handleSkillsSort = (
    hardSkills: boolean,
    skillName: string,
    index: number,
  ) => {
    setSortDirections((prevDirections) => {
      const newDirections = [...prevDirections];
      newDirections[index] = newDirections[index] === "asc" ? "desc" : "asc";
      // Сброс направления для остальных столбцов
      for (let i = 0; i < newDirections.length; i++) {
        if (i !== index) {
          newDirections[i] = "asc"; // Устанавливаем 'asc' для остальных столбцов
        }
      }
      return newDirections;
    });
    if (hardSkills) {
      const sortedEmployees = employees
        .filter((employer) =>
          employer.skills.hard_skills.some((skill) => skill.name === skillName),
        )
        .sort((a, b) => {
          const scoreA =
            a.skills.hard_skills.find((skill) => skill.name === skillName)
              ?.score || 0;
          const scoreB =
            b.skills.hard_skills.find((skill) => skill.name === skillName)
              ?.score || 0;
          if (sortDirections[index] == "asc") {
            return scoreB - scoreA;
          } else {
            return scoreA - scoreB;
          }
        });
      setDisplayedEmployees(sortedEmployees);
    } else {
      const sortedEmployees = employees
        .filter((employer) =>
          employer.skills.soft_skills.some((skill) => skill.name === skillName),
        )
        .sort((a, b) => {
          const scoreA =
            a.skills.soft_skills.find((skill) => skill.name === skillName)
              ?.score || 0;
          const scoreB =
            b.skills.soft_skills.find((skill) => skill.name === skillName)
              ?.score || 0;
          if (sortDirections[index] == "asc") {
            return scoreB - scoreA;
          } else {
            return scoreA - scoreB;
          }
        });
      setDisplayedEmployees(sortedEmployees);
    }
  };

  function handleNameSort(index: number) {
    setSortDirections((prevDirections) => {
      const newDirections = [...prevDirections];
      newDirections[index] = newDirections[index] === "asc" ? "desc" : "asc";
      // Сброс направления для остальных столбцов
      for (let i = 0; i < newDirections.length; i++) {
        if (i !== index) {
          newDirections[i] = "asc"; // Устанавливаем 'asc' для остальных столбцов
        }
      }
      return newDirections;
    });
    const sortedEmployees = employees.sort((a, b) => {
      if (sortDirections[index] === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setDisplayedEmployees(sortedEmployees);
  }

  function handleReitingSort() {
    console.log("сортировка по рейтингу");
  }

  if (!employees) return <div>Загрузка данных...</div>;

  return (
    <>
      <div className="skills__header">
        <h2 className="skills__title">Текущая экспертная оценка навыков</h2>
        <div className="skills__download">
          <DownloadDashbord minimalism={true} />
        </div>
        <div className="skills__buttons">
          <button
            className={`skills__skills-button ${hardSkills ? "skills__skills-button_active" : ""}`}
            onClick={() => {
              setHardSkills(true);
            }}
          >
            Hard skills
          </button>
          <button
            className={`skills__skills-button  ${!hardSkills ? "skills__skills-button_active" : ""}`}
            onClick={() => {
              setHardSkills(false);
            }}
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
                    className={
                      sortDirections[1025] == "desc"
                        ? "table__sort-button table__sort-button_desc"
                        : "table__sort-button"}
                    onMouseOver={() => handleMouseOver("1025")}
                    onMouseOut={handleMouseOut}
                    onClick={() => handleNameSort(1025)}
                  ></button>
                  <MyTooltip
                    showTooltip={showTooltip === "1025"}
                    text="Сортировка"
                    top={25}
                  />
                </th>
                <th className="table__raiting">
                  Рейтинг
                  <button
                    className="table__sort-button"
                    onMouseOver={() => handleMouseOver("147")}
                    onMouseOut={handleMouseOut}
                    onClick={() => handleReitingSort()}
                  ></button>
                  <MyTooltip
                    showTooltip={showTooltip === "147"}
                    text="Сортировка"
                    top={25}
                  />
                </th>
                {hardSkills &&
                  hardSkillsList.map((skillName, index) => (
                    <th key={uuidv4()} className="table__skill">
                      <div className="table__skill-container">
                        <p className="table__skill-text">{skillName}</p>
                        <button
                          className={
                            sortDirections[index] == "desc"
                              ? "table__sort-button table__sort-button_desc"
                              : "table__sort-button"
                          }
                          onMouseOver={() => handleMouseOver(String(index))}
                          onMouseOut={handleMouseOut}
                          onClick={() =>
                            handleSkillsSort(hardSkills, skillName, index)
                          }
                        ></button>
                        {/* <MyTooltip
                          showTooltip={showTooltip === String(index)}
                          text="Сортировка"
                          top={40}
                        /> */}
                      </div>
                    </th>
                  ))}
                {!hardSkills &&
                  softSkillsList.map((skillName, index) => (
                    <th key={uuidv4()} className="table__skill">
                      <div className="table__skill-container">
                        <p className="table__skill-text">{skillName}</p>
                        <button
                          className={
                            sortDirections[index] == "desc"
                              ? "table__sort-button table__sort-button_desc"
                              : "table__sort-button"
                          }
                          onMouseOver={() => handleMouseOver(String(index))}
                          onMouseOut={handleMouseOut}
                          onClick={() =>
                            handleSkillsSort(hardSkills, skillName, index)
                          }
                        ></button>
                      </div>
                    </th>
                  ))}
              </tr>
            </thead>

            <tbody>
              {displayedEmployees?.map((item, index) => (
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
                        top={30}
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
                        <div
                          className={
                            i.accordance === true
                              ? "employee__score"
                              : i.accordance === null
                                ? "employee__score employee__score_null "
                                : "employee__score employee__score_true "
                          }
                        >
                          <img
                            className="employee__score-progress"
                            src={i.growth ? progressUp : progressDown}
                            alt="прогресс"
                          />
                          <p className="employee__score-value">{i.score}</p>
                        </div>
                      </td>
                    ))}
                  {!hardSkills &&
                    item.skills.soft_skills.map((i) => (
                      <td key={uuidv4()}>
                        <div
                          className={
                            i.accordance === true
                              ? "employee__score"
                              : i.accordance === null
                                ? "employee__score employee__score_null "
                                : "employee__score employee__score_true "
                          }
                        >
                          <img
                            className="employee__score-progress"
                            src={i.growth ? progressUp : progressDown}
                            alt="прогресс"
                          />
                          <p className="employee__score-value">{i.score}</p>
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
