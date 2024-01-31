import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  console.log(active, payload, label)
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-800 rounded-md">
        <p className="text-medium text-lg text-white">{payload[0]?.payload.month}</p>
        <p className="text-sm text-green-500">
          총 절감량: <span className="ml-2">{payload[0]?.value} kg</span>
        </p>
      </div>
    );
  }
};

const MontlyLineChart = ({totalSavedCarb} : {totalSavedCarb: number}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [novTotalSavedCarb, setNovTotalSavedCarb] = useState<number>(0); // 총 절약 탄소량 
  const [octTotalSavedCarb, setOctTotalSavedCarb] = useState<number>(0); // 총 절약 탄소량 
  const [sepTotalSavedCarb, setSepTotalSavedCarb] = useState<number>(0); // 총 절약 탄소량 
  // const [augTotalSavedCarb, setAugTotalSavedCarb] = useState<number>(0); // 총 절약 탄소량 


  useEffect(() => {
    const fetchAllMonthData = async() =>{
      try{

        // 월별 data fetch url
        const novUrl = `http://openapi.seoul.go.kr:8088/${import.meta.env.VITE_API_KEY}/json/tbCycleRentUseMonthInfo/1/1000/202311`;
        const octUrl = `http://openapi.seoul.go.kr:8088/${import.meta.env.VITE_API_KEY}/json/tbCycleRentUseMonthInfo/1/1000/202310`;
        const sepUrl = `http://openapi.seoul.go.kr:8088/${import.meta.env.VITE_API_KEY}/json/tbCycleRentUseMonthInfo/1/1000/202309`;

        // 로딩 상태
        setLoading(true);

        // 11 월
        const {data: novData} = await axios.get(novUrl);
        const novResponse = novData.cycleRentUseMonthInfo;
        let novTotalSavedCarbSum = 0;
        novResponse.row.map((info:any) => {
          novTotalSavedCarbSum += info.CARBON_AMT ? parseInt(info.CARBON_AMT) : 0;
          setNovTotalSavedCarb(novTotalSavedCarbSum)
        })

        // 10월 

        const {data: octData} = await axios.get(octUrl);
        const octResponse = octData.cycleRentUseMonthInfo;
        let octTotalSavedCarbSum = 0;
        octResponse.row.map((info:any) => {
          octTotalSavedCarbSum += info.CARBON_AMT ? parseInt(info.CARBON_AMT) : 0;
          setOctTotalSavedCarb(octTotalSavedCarbSum)
        })

        // 9월
        const {data: sepData} = await axios.get(sepUrl);
        const sepResponse = sepData.cycleRentUseMonthInfo;
        let sepTotalSavedCarbSum = 0;
        sepResponse.row.map((info:any) => {
          sepTotalSavedCarbSum += info.CARBON_AMT ? parseInt(info.CARBON_AMT) : 0;
          setSepTotalSavedCarb(sepTotalSavedCarbSum)
        })

        setLoading(false);

      }catch(err){
        console.log(err);
      }
    }

    fetchAllMonthData()
  },[])

  if(loading){
    return (
      <>
        Loading . . .
      </>
    )
  }

  const dataSet = [
    {
      month: 'Sep',
      total: sepTotalSavedCarb,
    },
    {
      month: 'Oct',
      total: octTotalSavedCarb,
    },
    {
      month: 'Nov',
      total: novTotalSavedCarb,
    },
    {
      month: 'Dec',
      total: totalSavedCarb,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={400}
        height={300}
        data={dataSet}
        margin={{right:30}}
      >
        <Tooltip content={<CustomTooltip />} />
        <Line dataKey="total" stroke='green' />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default MontlyLineChart