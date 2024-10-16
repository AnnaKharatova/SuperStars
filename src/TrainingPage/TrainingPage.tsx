import "./TrainingPage.scss";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import defaultPhoto from "../assets/images/photo-default.svg";
import { BASE_URL } from "../utils/constants.js";

interface ITrainingData {
  request_count: number;
  results: {
    name: string;
    competence: string;
    course: string;
    quantity_employees: number;
    employees: {
      name: string;
      image: string;
      position: string;
      grade: string;
      bus_factor: false;
      test_data: {
        employee: number;
        position: number;
        grade: number;
      };
    }[];
  }[];
}

function TrainingPage() {
  const [data, setData] = useState<ITrainingData>();

  useEffect(() => {
    fetch(`${BASE_URL}/trainig_requests/`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((res) => {
        console.log("Ошибка при получении данных:", res.message);
      });
  }, []); 

  return (
    <section className="training">
      <div className="training__header">
        <h2 className="main__title">Запросы на обучение</h2>
        <span className="main__title-span">{data?.request_count}</span>
      </div>
      <div className="training__main">
        <table>
          <thead>
            <tr className="training__tr">
              <th className="training__competents">Компетенция</th>
              <th className="training__skill">Навык</th>
              <th className="training__program"> Обучающая программа</th>
              <th className="training__employer">Сотрудник</th>
            </tr>
          </thead>
          <tbody>
            {data?.results.map((item) => (
              <tr key={uuidv4()} className="training__tr">
                <td className="training__courses">
                  <p className="training__courses-name">{item.competence}</p>
                </td>
                <td className="training__courses">
                  <p className="training__courses-name">{item.course}</p>
                </td>
                <td className="training__courses training__courses-cell">
                  <p className="training__courses-name training__courses_item">
                    {item.name}
                  </p>
                  <p className="training__dates">15.10.24-25.11.24</p>
                  <div className="training__employee-count">
                    {item.quantity_employees}
                  </div>
                </td>
                <td className="training__employee-list">
                  {item.employees.map((employee) => (
                    <div key={uuidv4()} className="employee">
                      <img
                        className={
                          !employee.bus_factor
                            ? "employee__image"
                            : "employee__image_true"
                        }
                        src={employee.image ? `https://super-stars.online/api/v1${employee.image}` : defaultPhoto}
                      />
                      <div>
                        <p className="employee__name">{employee.name}</p>
                        <p className="employee__position">{`${employee.position}, ${employee.grade}`}</p>
                      </div>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TrainingPage;
