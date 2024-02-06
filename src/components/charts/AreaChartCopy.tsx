import React from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { FailureTimeType } from '../../types';


const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg text-white">{`${payload[0].payload.time}~${payload[0].payload.time+3}시`}</p>
        <p className="text-sm text-blue-400">
          접수 건수 :
          <span className="ml-2">{payload[0].value}회</span>
        </p>
      </div>
    );
  }
};

type Props = {
  data : FailureTimeType[]
}

const AreaChartCopyComponent = ({data}: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart width={500} height={400} data={data} className='absolute -left-6 -bottom-1'>
        <YAxis />
        {/* <XAxis dataKey="" /> */}
        <XAxis dataKey="time" />
        <CartesianGrid strokeDasharray="3" />
        <Tooltip content={<CustomTooltip />} />
        <Area 
          type="linear" 
          // dataKey="product1" 
          dataKey="cnt"
          stroke="#023020" 
          fill='#22A699' 
          opacity={0.4}
        />

      </AreaChart>
    </ResponsiveContainer>
  )
}


export default AreaChartCopyComponent