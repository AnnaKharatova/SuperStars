import './Compitents.scss'
import { useState } from 'react'
import DownloadDashbord from '../../DownloadDashbord/DownloadDashbord'
import { LineChart, CartesianGrid, XAxis, ResponsiveContainer, Tooltip, YAxis, Legend, Line } from 'recharts';

export const data = [
  {
    "name": "Page A",
    "uv": 4,
    "pv": 2,
    "amt": 2
  },
  {
    "name": "Page B",
    "uv": 3,
    "pv": 1,
    "amt": 4
  },
  {
    "name": "Page C",
    "uv": 2,
    "pv": 5,
    "amt": 2
  },
  {
    "name": "Page D",
    "uv": 2,
    "pv": 3,
    "amt": 2
  },
  {
    "name": "Page E",
    "uv": 1,
    "pv": 4,
    "amt": 2
  },
  {
    "name": "Page F",
    "uv": 2,
    "pv": 3,
    "amt": 2
  },
]

function Compitents() {

  const [hardSkills, setHardSkills] = useState(true)

  function handleSoftSkills() {
    setHardSkills(false)
  }

  function handleHardSkills() {
    setHardSkills(true)
  }

  function handleLineClick() {
    console.log('click')
  }

  return (
    <div className='compitents'>
      <div className='compitents__header'>
        <div className='compitents__download'>
          <DownloadDashbord minimalism={true} />
        </div>
        <h2 className='compitents__title'>Динамика оценки компетенций</h2>
        <div className='compitents__buttons'>
          <button className={`compitents__skills-button ${hardSkills ? 'compitents__skills-button_active' : ''}`} onClick={handleHardSkills}>Hard skills</button>
          <button className={`compitents__skills-button  ${!hardSkills ? 'compitents__skills-button_active' : ''}`} onClick={handleSoftSkills}>Soft skills</button>
          <button className='compitents__question-button'></button>
        </div>
      </div>
      <div className='compitents__caption'>Средняя оценка</div>
      <ResponsiveContainer>
        <LineChart width={730} height={350} data={data}
          margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis type="number" domain={[1, 'dataMax']} interval={0} />
          <Tooltip />
          <Legend />
          {hardSkills ?
            <>
              <Line name='Анализ данных и применение методов машинного обучения' type="monotone" dataKey="pv" stroke="#8884d8" onClick={handleLineClick} />
              <Line name="Базы данных" type="monotone" dataKey="uv" stroke="#82ca9d" />
              <Line name='Иностранные языки' type="monotone" dataKey="amt" stroke="#82ca9d" />
            </> :
            <>
              <Line name='Обучаемость' type="monotone" dataKey="pv" stroke="#8884d8" onClick={handleLineClick} />
              <Line name="Многозадачность" type="monotone" dataKey="uv" stroke="#82ca9d" />
              <Line name='Креативность' type="monotone" dataKey="amt" stroke="#82ca9d" />
              <Line name='Стрессоустойчивость' type="monotone" dataKey="amt" stroke="#82ca9d" />
              <Line name='Оптимистичность' type="monotone" dataKey="pv" stroke="#8884d8" onClick={handleLineClick} />

            </>}
        </LineChart>
      </ResponsiveContainer>

    </div>
  )
}

export default Compitents