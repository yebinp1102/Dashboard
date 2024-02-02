import StepList from '../components/StepList'
import { rentStepsData } from '../data/dummy';
import ReactPlayer from 'react-player'


const RentBike = () => {

  return (
    <div className='mt-12 w-full py-8 px-12 flex flex-wrap gap-8 justify-center'>

      {/* 영상 */}
      <div className='w-[830px] h-[500px] border self-center bg-white p-8'>
        <div className='w-full h-full border'>
          <ReactPlayer url="https://youtu.be/2i2FpMWQBnU" width="100%" height="100%" />
        </div>
      </div>

      {/* 방법 요약 */}
      <div className="w-[850px] flex flex-col gap-8 border rounded-lg shadow-xl bg-white mx-auto pt-8 pb-16 px-8">
        
        <h1 className='text-2xl font-black font-body'>대여 방법 요약</h1>
        
        <div className='flex flex-col gap-12 flex-wrap '>
          {rentStepsData.map((list, idx) => (
            <StepList index={idx+1} icon={list.icon} title={list.title} subText={list.subText} bgColor={list.bgColor} color={list.color} />
          ))}
        </div>

      </div>
    </div>
  )
}

export default RentBike