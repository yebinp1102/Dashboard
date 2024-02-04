import { PieChart, Pie, Cell } from 'recharts';

const ExpData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#F03A47', '#395C6B', '#395C6B'];

type FailType = {
  type: string;
  cnt: number;
}

type Props ={
  data : FailType[]
}

const FailureTypePieChart = ({data}: Props) => {
  return (
      <PieChart width={180} height={200}>
        <Pie
          data={data}
          innerRadius={30}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {ExpData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>  )
}

export default FailureTypePieChart