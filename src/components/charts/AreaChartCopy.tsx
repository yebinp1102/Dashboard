import React from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const productSales = [
  {
    name: 'Jan',
    product1: 4000,
    product2: 2400,
  },
  {
    name: 'Feb',
    product1: 3000,
    product2: 2210,
  },
  {
    name: 'Mar',
    product1: 2000,
    product2: 2290,
  },
  {
    name: 'Apr',
    product1: 2780,
    product2: 2000,
  },
  {
    name: 'May',
    product1: 1890,
    product2: 2181,
  },
  {
    name: 'Jun',
    product1: 2390,
    product2: 2500,
  },
  {
    name: 'Apr',
    product1: 2780,
    product2: 2000,
  },
  {
    name: 'May',
    product1: 1890,
    product2: 2181,
  },
  {
    name: 'Jun',
    product1: 2390,
    product2: 2500,
  },
];

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg text-white">{label}</p>
        <p className="text-sm text-blue-400">
          Product 1:
          <span className="ml-2">${payload[0].name}</span>
        </p>
      </div>
    );
  }
};

const AreaChartCopyComponent = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart width={500} height={400} data={productSales} className='absolute -left-6 -bottom-1'>
        <YAxis />
        <XAxis dataKey="name" />
        <CartesianGrid strokeDasharray="3" />
        <Tooltip content={<CustomTooltip />} />
        <Area 
          type="linear" 
          dataKey="product1" 
          stroke="#023020" 
          fill='#22A699' 
          opacity={0.4}
        />

      </AreaChart>
    </ResponsiveContainer>
  )
}


export default AreaChartCopyComponent