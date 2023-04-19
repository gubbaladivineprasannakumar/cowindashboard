// Write your code here
import './index.css'

import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByAge = props => {
  const {vaccinationByAgeList} = props
  return (
    <div className="vaccination-age-container">
      <h1>Vaccination by Age</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            cx="70%"
            cy="40%"
            data={vaccinationByAgeList}
            startAngle={0}
            endAngle={360}
            innerRadius="0%"
            outerRadius="60%"
            dataKey="count"
          >
            <Cell name="18-44" fill="#fecba6" />
            <Cell name="44-60" fill="#b3d23f" />
            <Cell name="Above 60" fill="#a44c9e" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="middle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByAge
