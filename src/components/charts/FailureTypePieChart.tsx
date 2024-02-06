import { PieChart, Pie, Cell } from 'recharts';
import { FailureTypesType } from '../../types';

const ExpData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

type Props = {
  data: FailureTypesType[],
  colors: string[]
}

const FailureTypePieChart = ({data, colors}: Props) => {

  return (
      <PieChart width={180} height={200}>
        <Pie
          data={data}
          innerRadius={30}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="cnt"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>  )
}

export default FailureTypePieChart