import { PieChart, Pie, Cell } from 'recharts';
import { FailureTypesType } from '../../types';

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
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>  )
}

export default FailureTypePieChart