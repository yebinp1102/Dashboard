import { PiSneakerMoveBold } from "react-icons/pi";
import { BiLeaf, BiLogoUpwork } from "react-icons/bi";
import { FaRegSmile } from "react-icons/fa";
import City from '/assets/images/city.svg';

const Home = () => {
  return (
    <div className='my-20 px-4'>

      <div className='relative border p-4 bg-primary-dark-green shadow-lg rounded-2xl mx-auto max-w-5xl h-[300px]'>

        <div className='p-4 px-8'>
          <p className='text-primary-500 text-xl font-point font-black mt-4 mb-2'>자전거와 함께하는 건강한 도시,</p>
          <p className='text-3xl text-white font-point font-black'>세계적인 자전거 도시 서울</p>
        </div>

        <div>
          <img 
            src={City}
            alt="city_img_svg" 
            className='absolute right-0 -bottom-6 w-[380px]' 
          />
        </div>

        <button className='absolute -bottom-4 rounded-tr-full -left-4 text-xl bg-primary-500 text-white p-8 pr-14'>
          더 많은 소식 보기
        </button>
      </div>


      {/* list container */}
      <div className='flex flex-wrap gap-16 gap-y-28 justify-center mx-auto max-w-5xl mt-32'>

        {/* list 01 */}
        <div className='bg-white w-[450px] h-[300px] border shadow-lg rounded-xl relative'>
          <div className='w-[120px] h-[350px] absolute -top-5 left-9'>

            {/* index container */}
            <div className='flex flex-col h-full text-white'>
              <div className="bg-primary-500 h-[45px] w-full rounded-b-2xl shadow-lg text-center pt-1 text-lg">vision</div>
              <div className='text-6xl font-point font-black flex items-center justify-center h-[110px] text-slate-500'>01</div>
              
              <div className='bg-primary-500 w-full flex-1 rounded-t-2xl shadow-lg px-8'>
                <div className="flex flex-col items-center border-t-[3px] border-white mt-8">
                  <BiLogoUpwork className="text-[76px] mt-4" />
                  <p className="text-[1.2rem] font-black">성장</p>
                </div>

              </div>
            </div>

          </div>

          {/* text container */}
          <div className="w-[220px] p-4 pt-12 h-full absolute right-0">
            <p className="text-[1.85rem] border-t-2 border-slate-300 mb-8 pt-4"><p className="text-primary-500 font-black">녹색 성장</p> 선도 도시</p>
            <p>국가의 비전 중 하나인 "저탄소 녹색 성장"을 실현하기 위해 노력합니다.</p>
          </div>
        </div>

        {/* list 02 */}
        <div className='bg-white w-[450px] h-[300px] border shadow-lg rounded-xl relative'>
          <div className='w-[120px] h-[350px] absolute -top-5 left-9'>

            {/* index container */}
            <div className='flex flex-col h-full text-white'>
              <div className="bg-primary-orange h-[45px] w-full rounded-b-2xl shadow-lg text-center pt-1 text-lg">vision</div>
              <div className='text-6xl font-point font-black flex items-center justify-center h-[110px] text-slate-500'>02</div>
              
              <div className='bg-primary-orange w-full flex-1 rounded-t-2xl shadow-lg px-8'>
                <div className="flex flex-col items-center border-t-[3px] border-white mt-8">
                  <BiLeaf className="text-[76px] mt-4" />
                  <p className="text-lg font-black" >깨끗한</p>
                </div>

              </div>
            </div>

          </div>

          {/* text container */}
          <div className="w-[220px] p-4 pt-12 h-full absolute right-0">
            <p className="text-[1.85rem] border-t-2 border-slate-300 mb-8 pt-4"><p className="text-primary-orange font-black">깨끗한</p> 자전거 도시</p>
            <p>자전거를 통해 교통수단 분담률을 향상시키고 CO2 절감에 기여합니다.</p>
          </div>
        </div>

        {/* list 03 */}
        <div className='bg-white w-[450px] h-[300px] border shadow-lg rounded-xl relative'>
          <div className='w-[120px] h-[350px] absolute -top-5 left-9'>

            {/* index container */}
            <div className='flex flex-col h-full text-white'>
              <div className="bg-primary-red-orange h-[45px] w-full rounded-b-2xl shadow-lg text-center pt-1 text-lg">vision</div>
              <div className='text-6xl font-point font-black flex items-center justify-center h-[110px] text-slate-500'>03</div>
              
              <div className='bg-primary-red-orange w-full flex-1 rounded-t-2xl shadow-lg px-8'>
                <div className="flex flex-col items-center border-t-[3px] border-white mt-8">
                  <PiSneakerMoveBold className="text-[80px] mt-6" />
                  <p className="text-lg font-black" >건강한</p>
                </div>

              </div>
            </div>

          </div>

          {/* text container */}
          <div className="w-[220px] p-4 pt-12 h-full absolute right-0">
            <p className="text-[1.85rem] border-t-2 border-slate-300 mb-8 pt-4"><p className="text-primary-red-orange font-black">건강한</p> 자전거 도시</p>
            <p>자전거 이용의 생활화를 통한 시민 건강 증진 실현을 추구합니다.</p>
          </div>
        </div>

        {/* list 04 */}
        <div className='bg-white w-[450px] h-[300px] border shadow-lg rounded-xl relative'>
          <div className='w-[120px] h-[350px] absolute -top-5 left-9'>

            {/* index container */}
            <div className='flex flex-col h-full text-white'>
              <div className="bg-primary-yellow h-[45px] w-full rounded-b-2xl shadow-lg text-center pt-1 text-lg">vision</div>
              <div className='text-6xl font-point font-black flex items-center justify-center h-[110px] text-slate-500'>04</div>
              
              <div className='bg-primary-yellow w-full flex-1 rounded-t-2xl shadow-lg px-8'>
                <div className="flex flex-col items-center border-t-[3px] border-white mt-8">
                  <FaRegSmile className="text-[74px] mt-6" />
                  <p className="text-lg font-black mt-2" >편리한</p>
                </div>

              </div>
            </div>

          </div>

          {/* text container */}
          <div className="w-[220px] p-4 pt-12 h-full absolute right-0">
            <p className="text-[1.85rem] border-t-2 border-slate-300 mb-8 pt-4"><p className="text-primary-yellow font-black">편리한</p> 자전거 도시</p>
            <p>곳곳에 배치된 자전거로 시민의 이동 편리성 증진에 기여합니다.</p>
          </div>
        </div>        

      </div>

    </div>
  )
}

export default Home