import { PieChart, Pie, Cell } from 'recharts';
import { UsageAgeType } from '../../types';

const COLORS = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042', '#F03A47', '#395C6B'];

type Props = {
  data: UsageAgeType[]
}

const AgeTypePieChart = ({data}: Props) => {
  return (
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="cnt"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>  )
}

export default AgeTypePieChart