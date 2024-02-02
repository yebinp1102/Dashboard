import StepList from '../components/StepList'
import ReactPlayer from 'react-player';
import { returnStepsData } from '../data/dummy';


const ReturnBike = () => {
  return (
    <div className='mt-12 w-full py-8 px-12 flex flex-wrap gap-8 justify-center'>

      {/* 영상 */}
      <div className='w-[850px] h-[500px] border bg-white p-8 self-center'>
        <ReactPlayer url="https://youtu.be/qV8lem9vy8U" width="100%" height="100%" />
      </div>

      {/* 방법 요약 */}
      <div className="w-[850px] flex flex-col gap-8 border rounded-lg bg-white mx-auto pt-8 pb-16 px-8">
        
        <h1 className='text-2xl font-black font-body'>반납 & 임시잠금 방법 요약</h1>
        <div className='flex flex-col gap-12 flex-wrap '>
          {returnStepsData.map((list, idx) => (
            <StepList index={idx+1} icon={list.icon} title={list.title} subText={list.subText} bgColor={list.bgColor} color={list.color} />
          ))}
        </div>

      </div>
    </div>
  )
}

export default ReturnBike