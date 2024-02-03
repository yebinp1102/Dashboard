import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import FailureTypePieChart from '../components/charts/FailureTypePieChart';
import { GoDotFill } from "react-icons/go";
import LineChartComponent from '../components/charts/LineChart';
import AreaChartCopyComponent from '../components/charts/AreaChartCopy';
import AgeTypePieChart from '../components/charts/AgeTypePieChart';

// 어제 날짜를 YYYYMMDD 형식으로 반환하는 함수
const getYesterdayDate = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const year = yesterday.getFullYear();
  const month = (yesterday.getMonth() + 1).toString().padStart(2, '0');
  const day = yesterday.getDate().toString().padStart(2, '0');

  return `${year}${month}${day}`;
};

const FailureReport = () => {
  const today = getYesterdayDate();
  const [date, setData] = useState<string>(today);   // 사용자에게 직접 입력받음  
  const [inputValue, setInputValue] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalFailure, setTotalFailure] = useState<string>(0);

  const handleSubmitNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter' && inputValue?.length === 8){
      setData(inputValue);
    }
  }

  // useEffect(() => {

  //   if(date.length === 8){
  //     // 일별 고장 이력
  //     const url = `http://openapi.seoul.go.kr:8088/${import.meta.env.VITE_API_KEY}/json/tbCycleFailureReport/1/1000/${date}`
  //     // 일별 사용 이력
  //     const memurl = `http://openapi.seoul.go.kr:8088/${import.meta.env.VITE_API_KEY}/json/tbCycleRentUseDayInfo/1/1000/${date}`
  //     const fetchData = async () => {
  //       const {data} = await axios.get(url);
  //       console.log('url_result :', data.failureReport);

  //       const {data: memData} = await axios.get(memurl);
  //       console.log('mem_url :', memData.cycleRentUseDayInfo)
  //     }
  //     // fetchData();
  //   }

  //   console.log(date);
  // },[])

  if(isLoading){
    return (
      <div className="w-full h-screen flex items-center justify-center gap-4">
        <Loader />
        <p className="text-2xl font-black">{`${date.slice(0,4)}년 ${date.slice(4,6)}월 ${date.slice(6,8)}일의 통계를 불러오는 중입니다. . .`}</p>
      </div>
    )
  }

  return (
    <div className='my-12'>

      <div className="flex justify-center">
              
        <div className="flex flex-col gap-8 px-8">

          {/* 일별 통계 & 기준 일자 & 기준 일자 변경 */}
          <div className='flex items-center justify-between gap-8 w-full bg-white border pb-2.5 px-8 rounded-lg shadow-lg'>
            <h1 className=' text-3xl font-black'>일별 통계</h1>
            <div className='flex flex-col text-slate-500'>
              <p className='self-end'>기준 일자 : <span className=' text-base font-black text-black'>{`${date.slice(0,4)}년 ${date.slice(4,6)}월 ${date.slice(6,8)}일`}</span></p>
              <input 
                type="number"
                placeholder='YYYYMMDD 형태로 기준 일자 입력 ex) 20240203' 
                className='focus:none w-[300px] placeholder:text-slate-500 text-black placeholder:text-sm mt-2 border-b-1 border-slate-500 pb-1' 
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleSubmitNumber}
              />
            </div>
          </div>

          {/* 4 chart container - main */}
          <div className="flex flex-col gap-4">
            
            {/* 1. 일별 고장 이력 분석 */}
            <h1 className='text-xl px-4'>일별 고장 이력</h1>
            <div className="flex flex-wrap gap-4">

              {/* 1-1. 고장 유형 */}
              <div className="border bg-white shadow-lg rounded-lg w-full 2xl:w-[541px] py-4 px-8">
                <h3 className='border-b pb-4 w-full text-slate-500'>고장 유형</h3>
                
                <div className='flex items-center justify-center gap-16 pr-8 py-8'>
                  <FailureTypePieChart />
                  <div className='flex flex-col gap-6'>
                    <h1 className='text-xl font-black'>총 고장 횟수 : {totalFailure} 번</h1>
                    {/* 고장 유형 리스트 */}
                    <div className='flex flex-col gap-3'>

                      {/* 고장 유형 1 */}
                      <div className='flex items-center gap-8 text-primary-500'>
                        <p className='flex items-center gap-2'> 
                          <GoDotFill /> <span className='text-black'>유형 1 : 999</span>
                        </p>
                        <div className='text-2xl'>10%</div>
                      </div>

                      {/* 고장 유형 1 */}
                      <div className='flex items-center gap-8 text-[#0088FE]'>
                        <p className='flex items-center gap-2'> 
                          <GoDotFill /> <span className='text-black'>유형 1 : 999</span>
                        </p>
                        <div className='text-2xl'>10%</div>
                      </div>

                      {/* 고장 유형 1 */}
                      <div className='flex items-center gap-8 text-[#FFBB28]'>
                        <p className='flex items-center gap-2'> 
                          <GoDotFill /> <span className='text-black'>유형 1 : 999</span>
                        </p>
                        <div className='text-2xl'>10%</div>
                      </div>

                      {/* 고장 유형 1 */}
                      <div className='flex items-center gap-8 text-[#FF8042]'>
                        <p className='flex items-center gap-2'> 
                          <GoDotFill /> <span className='text-black'>유형 1 : 999</span>
                        </p>
                        <div className='text-2xl'>10%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 1-2. 고장 시간대 */}
              <div className='2xl:w-[630px] flex-1 border bg-white rounded-lg shadow-lg py-4 px-6'>
                <h3 className='pb-8 px-2 w-full text-slate-500'>고장 접수 시간대 분석</h3>
                <div className='h-[280px] relative'>
                  <AreaChartCopyComponent />
                </div>
              </div>

            </div>


            {/* 2. 일별 대여 유형 분석 */}
            <h1 className='text-xl px-4 mt-6'>일별 대여 이력</h1>
            <div className='flex flex-wrap gap-4'>

              {/* 2-1. 대여 연령대 */}
              <div className="bg-white border w-full shadow-lg 2xl:max-w-fit rounded-lg p-4 px-8">
                <h3 className='border-b pb-4 w-full text-slate-500'>대여 연령대</h3>
                <h1 className='text-slate-500 mt-4 pl-1 text-sm'>10대는 만 10세부터 만 19세에 해당하는 이용자를 포함하고 있습니다.</h1>
                <div className="flex items-center justify-center gap-8">
                  <AgeTypePieChart />
                  <div className="flex flex-col gap-4 mt-4 bg-primary-500 px-10 text-white p-4 rounded-lg shadow-md">

                    {/* 연령대 유형 1 */}
                    <div className='flex items-center justify-between gap-8'>
                      <p className='flex items-center gap-2'><GoDotFill /><span>10 대</span></p>
                      <p className='text-2xl font-black'>25%</p>
                    </div>

                    {/* 연령대 유형 1 */}
                    <div className='flex items-center justify-between gap-8'>
                      <p className='flex items-center gap-2'><GoDotFill /><span>20 대</span></p>
                      <p className='text-2xl font-black'>25%</p>
                    </div>

                    {/* 연령대 유형 1 */}
                    <div className='flex items-center justify-between gap-8'>
                      <p className='flex items-center gap-2'><GoDotFill /><span>30 대</span></p>
                      <p className='text-2xl font-black'>25%</p>
                    </div>

                    {/* 연령대 유형 1 */}
                    <div className='flex items-center justify-between gap-8'>
                      <p className='flex items-center gap-2'><GoDotFill /><span>40 대</span></p>
                      <p className='text-2xl font-black'>25%</p>
                    </div>

                    {/* 연령대 유형 1 */}
                    <div className='flex items-center justify-between gap-10'>
                      <p className='flex items-center gap-2'><GoDotFill /><span>50 대 이상</span></p>
                      <p className='text-2xl font-black'>25%</p>
                    </div>

                  </div>
                </div>
              </div>

              {/* 2-2. 이용 시간대 */}

            </div>

          </div>


        </div>
      </div>

    </div>
  )
}

export default FailureReport