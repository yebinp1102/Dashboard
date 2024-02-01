import StepList from '../components/StepList'
import {FiAlertCircle} from 'react-icons/fi'
import { IoMdApps } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoLockOpenOutline } from "react-icons/io5";
import { FaArrowRotateRight } from "react-icons/fa6";

const stepListData = [
  {
    icon: <IoMdApps />,
    title: "따릉이 앱 실행",
    subText: "따릉이 앱을 실행하고 이용권을 결제합니다. 이용권은 정기권, 일일권, 단체권이 있습니다.",
    bgColor: 'bg-primary-500',
    color: 'text-primary-500',
  },
  {
    icon: <FaRegCheckCircle />,
    title: "자전거 점검",
    subText: "주행할 자전거를 고르고 타이어와 브레이크, 체인을 확인합니다.",
    bgColor: 'bg-primary-dark-green',
    color: 'text-primary-dark-green',
  },
  {
    icon: <FaArrowRotateRight />,
    title: "대여하기",
    subText: "<대여하기>를 누르고 단말기 QR코드를 스캔합니다. 단말기는 따릉이 뒷바퀴 상단부에 있습니다.",
    bgColor: 'bg-primary-orange',
    color: 'text-primary-orange',
  },
  {
    icon: <IoLockOpenOutline />,
    title: "잠금장치 풀기",
    subText: "잠금장치가 열리면 자전거를 거치대에서 분리합니다. 이때 잠금장치를 열지 않고 따릉이를 옮길 시 경보음이 울릴 수 있습니다.",
    bgColor: 'bg-primary-yellow',
    color: 'text-primary-yellow',
  },
  {
    icon: <FiAlertCircle />,
    title: "대여 완료",
    subText: "이용 수칙을 준수하여 따릉이를 이용합니다. (음주 운전 금지, 주행 중 휴대전화 사용 금지, 이어폰 사용 금지",
    bgColor: 'bg-primary-red-orange',
    color: 'text-primary-red-orange',
  }
]

const RentBike = () => {
  return (
    <div className='mt-12 w-full py-8 px-12 flex flex-wrap gap-8 justify-center'>

      {/* 영상 */}
      <div className='w-[850px] h-[500px] border bg-white p-8'>
        <div className='bg-black flex items-center justify-center text-3xl w-full h-full text-white'>영상</div>
      </div>

      {/* 방법 요약 */}
      <div className="w-[850px] flex flex-col gap-8 border rounded-lg shadow-xl bg-white mx-auto pt-8 pb-16 px-8">
        
        <h1 className='text-2xl font-black font-body'>대여 방법 요약</h1>
        
        <div className='flex flex-col gap-12 flex-wrap '>
          {stepListData.map((list, idx) => (
            <StepList index={idx+1} icon={list.icon} title={list.title} subText={list.subText} bgColor={list.bgColor} color={list.color} />
          ))}
        </div>

      </div>
    </div>
  )
}

export default RentBike