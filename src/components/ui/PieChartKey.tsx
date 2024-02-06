import { GoDotFill } from 'react-icons/go'
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#F03A47', '#395C6B'];

type Props = {
  type: string;
  cnt: number;
  color: string;
  totalCnt: string | number;
}

const PieChartKey = ({type, cnt, color, totalCnt}: Props) => {
  return (
    <div 
      className={
        `flex items-center gap-8 ${color} ${color === '#F03A47' && 'text-[#F03A47]'} ${color === '#395C6B' && 'text-[#395C6B]'}`
        }
      >
      <p className='flex items-center gap-2'> 
        <GoDotFill /> <span className='text-black'>{type} : {cnt}</span>
      </p>
      <div className='text-[1.25rem]'>{(cnt/Number(totalCnt) * 100).toFixed(1) }%</div>
    </div>
  )
}

export default PieChartKey