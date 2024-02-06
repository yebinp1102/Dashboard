import { GoDotFill } from 'react-icons/go'

type Props = {
  type: string;
  cnt: number;
  color?: string;
  totalCnt: number;
}

const PieChartKey = ({type, cnt, color, totalCnt}: Props) => {
  const count = totalCnt > 1000 ? 1000 : totalCnt
  return (
    <div 
      className={
        `flex items-center gap-8 ${color} ${color === '#F03A47' && 'text-[#F03A47]'} ${color === '#395C6B' && 'text-[#395C6B]'}`
        }
      >
      <p className='flex items-center gap-2'> 
        <GoDotFill /> <span className='text-black'>{type} : {cnt}</span>
      </p>
      <div className='text-[1.25rem]'>{(cnt/count * 100).toFixed(1) }%</div>
    </div>
  )
}

export default PieChartKey