import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import DownloadDashbord from "../DownloadDashbord/DownloadDashbord";
import FilterItem from "./FilterItem/FilterItem";
import delCross from "../assets/icons/delete-cross.svg";
import "./Filters.scss";
import { IFilter, IEmployees } from '../utils/types';

interface IProps {
  setFetchedData: (data:IEmployees[]) => void
}

interface IFiltersList {
  filter: string,
  itemsList: IFilter[],
  selectedIdList: number[],
  setSelectedIdList: (data: number[]) => void,
}

function Filters({ }:IProps) {

  const [filterMark, setFilterMark] = useState<string[]>([])

  const [competencesList, setCompetencesList] = useState<IFilter[]>([])
  const [selectedIdCompetencesList, setSelectedIdCompetencesList] = useState<number[]>([])

  const [positionList, setPositionList] = useState<IFilter[]>([])
  const [selectedIdPositionList, setSelectedIdPositionList] = useState<number[]>([])

  const [gradesList, setGradesList] = useState<IFilter[]>([])
  const [selectedIdGradesList, setSelectedIdGradesList] = useState<number[]>([])

  const [employeesList, setEmployeesList] = useState<IFilter[]>([])
  const [selectedIdEmployeesList, setSelectedIdEmployeesList] = useState<number[]>([])

  const [teamsList, setTeamsList] = useState<IFilter[]>([])
  const [selectedIdteamsList, setSelectedIdTeamsList] = useState<number[]>([])

  const [skillsList, setSkillsList] = useState<IFilter[]>([])
  const [selectedIdSkillsList, setSelectedIdSkillsList] = useState<number[]>([])

  const filtersList: IFiltersList[] = [
    {
      filter: 'Команда',
      itemsList: teamsList,
      selectedIdList: selectedIdteamsList,
      setSelectedIdList: setSelectedIdTeamsList,
    },
    {
      filter: 'Должность',
      itemsList: positionList,
      selectedIdList: selectedIdPositionList,
      setSelectedIdList: setSelectedIdPositionList,
    },
    {
      filter: 'Грейд',
      itemsList: gradesList,
      selectedIdList: selectedIdGradesList,
      setSelectedIdList: setSelectedIdGradesList
    },
    {
      filter: 'Сотрудник',
      itemsList: employeesList,
      selectedIdList: selectedIdEmployeesList,
      setSelectedIdList: setSelectedIdEmployeesList
    },
    {
      filter: 'Компетенция',
      itemsList: competencesList,
      selectedIdList: selectedIdCompetencesList,
      setSelectedIdList: setSelectedIdCompetencesList
    },
    {
      filter: 'Навык',
      itemsList: skillsList,
      selectedIdList: selectedIdSkillsList,
      setSelectedIdList: setSelectedIdSkillsList
    }

  ]

  /* const groups = selectedGroup ? selectedGroup.map(group => `group=${group}&`).join('') : '';
    const engins = selectedEngine ? selectedEngine.map(engine => `engine_cat=${engine}&`).join('') : '';
    const SEARCH_URL = `${BASE_URL}/catalog/catalog/?${groups}${engins}search=${inputValue}&page=${page}`; */

  useEffect(() => {
    fetch(`https://super-stars.online/api/v1/filters/grades/`)
      .then((response) => response.json())
      .then((data) => {
        setGradesList(data);
      })
      .catch((res) => {
        console.log("Ошибка при получении данных:", res.message);
      });
  }, []);

  useEffect(() => {
    fetch(`https://super-stars.online/api/v1/filters/teams/`)
      .then((response) => response.json())
      .then((data) => {
        setTeamsList(data);
      })
      .catch((res) => {
        console.log("Ошибка при получении данных:", res.message);
      });
  }, []);

  useEffect(() => {
    fetch(`https://super-stars.online/api/v1/filters/employees_filters/`)
      .then((response) => response.json())
      .then((data) => {
        setEmployeesList(data);
      })
      .catch((res) => {
        console.log("Ошибка при получении данных:", res.message);
      });
  }, []);

  useEffect(() => {
    fetch(`https://super-stars.online/api/v1/filters/positions/`)
      .then((response) => response.json())
      .then((data) => {
        setPositionList(data);
      })
      .catch((res) => {
        console.log("Ошибка при получении данных:", res.message);
      });
  }, []);

  useEffect(() => {
    fetch(`https://super-stars.online/api/v1/filters/competences/`)
      .then((response) => response.json())
      .then((data) => {
        setCompetencesList(data);
      })
      .catch((res) => {
        console.log("Ошибка при получении данных:", res.message);
      });
  }, []);

  useEffect(() => {
    fetch(`https://super-stars.online/api/v1/filters/skills/`)
      .then((response) => response.json())
      .then((data) => {
        setSkillsList(data);
      })
      .catch((res) => {
        console.log("Ошибка при получении данных:", res.message);
      });
  }, []);

  function handleRemoveAll() {
    setFilterMark([])
  }

  return (
    <section>
      <div className="filters">
        <div>
          <button className="filter-item__button">Период</button>
        </div>
        {filtersList.map(item => (
          <FilterItem key={uuidv4()} filter={item.filter} itemsList={item.itemsList} filterMark={filterMark} setFilterMark={setFilterMark} selectedIdList={item.selectedIdList} setSelectedIdList={item.setSelectedIdList} />
        ))}

        <button className="filters__submit-button">Применить фильтры</button>
        <DownloadDashbord minimalism={false} />
      </div>
      <ul className="filters__marks">
        {filterMark.length > 0 &&
          <>
            <li>
              <button className="filters__delete-all" onClick={handleRemoveAll}></button>
            </li>
            {filterMark.map((item) => (
              <li className="filters__mark" key={uuidv4()}>
                <div className="filters__mark-span">{item}</div>
                <button className="filters__mark-del">
                  <img src={delCross} alt="delete" />
                </button>
              </li>
            ))}
          </>
        }
      </ul>
    </section>
  );
}

export default Filters;
