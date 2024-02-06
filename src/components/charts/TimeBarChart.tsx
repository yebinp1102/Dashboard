import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { UsageTimeType } from '../../types';


const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg text-white">{label} 분</p>
        <p className="text-sm text-blue-400">
          이용 건수 :
          <span className="ml-2">{payload[0].value} 회</span>
        </p>
      </div>
    );
  }
};

type Props = {
  data: UsageTimeType[]
}

const TimeBarChart = ({data}: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%" className="absolute -bottom-2 -left-4" >
      <BarChart
        width={200}
        height={200}
        data={data}
        margin={{top: 16}}
        barSize={20}
      >
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="cnt" fill='#22A699' />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default TimeBarChart