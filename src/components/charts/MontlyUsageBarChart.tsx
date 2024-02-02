import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { UsageListType } from '../../types';


const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg text-white">{label}</p>
        <p className="text-sm text-blue-400">
          이용 거리 합산 :
          <span className="ml-2">{payload[0].value.toFixed(1)} (km)</span>
        </p>
        <p className="text-sm text-indigo-400">
          이용 시간 합산 :
          <span className="ml-2">{payload[1].value} 분</span>
        </p>
      </div>
    );
  }
};

type Props = {
  topFiveData: UsageListType[]
}

const MontlyUsageBarChart = ({topFiveData} : Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={topFiveData}
        margin={{right: 30}}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="use_dist" fill='#395C6B' stackId="1" />
        <Bar dataKey="use_time" fill='#22A699' stackId="1" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default MontlyUsageBarChart