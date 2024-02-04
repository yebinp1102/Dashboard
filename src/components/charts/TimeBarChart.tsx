import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const salesData = [
  {
    name: '0~30분',
    revenue: 4000,
  },
  {
    name: '31~60분',
    revenue: 3000,
  },
  {
    name: '61~120분',
    revenue: 6800,
  },
  {
    name: '121분 이상',
    revenue: 3908,
  }
];

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg text-white">{label}</p>
        <p className="text-sm text-blue-400">
          이용 건수 :
          <span className="ml-2">{payload[0].value} 회</span>
        </p>
      </div>
    );
  }
};

const TimeBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%" className="absolute -bottom-2 -left-4" >
      <BarChart
        width={200}
        height={200}
        data={salesData}
        margin={{top: 16}}
        barSize={20}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="revenue" fill='#22A699' />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default TimeBarChart