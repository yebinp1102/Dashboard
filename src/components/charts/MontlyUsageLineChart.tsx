import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { UsageListType } from '../../types';


const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg text-white">{payload[0]?.payload.name}</p>
        <p className="text-sm text-blue-400">
          대여 건수:
          <span className="ml-2">{payload[0]?.value} 대</span>
        </p>
      </div>
    );
  }
};

type Props = {
  topFiveData: UsageListType[]
}

const MontlyUsageLineChart = ({topFiveData}: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={topFiveData}
        margin={{ right:30}}
      >
        <Tooltip content={<CustomTooltip />} />
        <Line dataKey="use_cnt" stroke='green' />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default MontlyUsageLineChart