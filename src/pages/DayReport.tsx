import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import FailureTypePieChart from '../components/charts/FailureTypePieChart';
import { GoDotFill } from "react-icons/go";
import AreaChartCopyComponent from '../components/charts/AreaChartCopy';
import AgeTypePieChart from '../components/charts/AgeTypePieChart';
import TimeBarChart from '../components/charts/TimeBarChart';

// 어제 날짜를 YYYYMMDD 형식으로 반환하는 함수
const getYesterdayDate = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const year = yesterday.getFullYear();
  const month = (yesterday.getMonth() + 1).toString().padStart(2, '0');
  const day = yesterday.getDate().toString().padStart(2, '0');

  return `${year}${month}${day}`;
};

const DayReport = () => {
  const today = getYesterdayDate();
  const [date, setData] = useState<string>(today);  // 사용자에게 직접 입력받음  
  const [inputValue, setInputValue] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalFailure, setTotalFailure] = useState<string | number>(0);
  const [totalUsage, setTotalUsage] = useState<string | number>(0);

  let failureTypeMap = new Map();
  let failTypes:any = [];
  let failureTimeMap = new Map();
  let failTimes = [];


  let usageMap = new Map();
  let usageTimeMap = new Map();

  const handleSubmitNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter' && inputValue?.length === 8){
      setData(inputValue);
    }
  }

  useEffect(() => {

    if(date.length === 8){
      const fetchData = async() => {
        try{
          // 일별 고장 이력
          const dayFailureUrl = `http://openapi.seoul.go.kr:8088/${import.meta.env.VITE_API_KEY}/json/tbCycleFailureReport/1/1000/${date}`
          // 일별 사용 이력
          const dayUsageUrl = `http://openapi.seoul.go.kr:8088/${import.meta.env.VITE_API_KEY}/json/tbCycleRentUseDayInfo/1/1000/${date}`
        
          setIsLoading(true);
          const {data: failureData } = await axios.get(dayFailureUrl);
          const failureReport = failureData.failureReport;

          const {data: usageData} = await axios.get(dayUsageUrl);
          const usageReport = usageData.cycleRentUseDayInfo;

          console.log(failureReport.row[0].regDttm.split(' ')[1].split(':')[0])

          failureTypeMap.clear();
          failureTimeMap.clear();
          usageMap.clear();
          failTypes = [];
          failTimes = []

          if(failureReport){
            setTotalFailure(failureReport.list_total_count)
            
            failureReport.row.forEach((report:any) => {

              // 고장 유형 통계 - map 객체 업데이트
              const failureType = report.mlangComCdName.trim();
              if(failureTypeMap.has(failureType)){
                failureTypeMap.set(failureType, failureTypeMap.get(failureType)+1)
              }else{
                failureTypeMap.set(failureType, 1)
              }

              // 고장 접수 시간대 통계
              // failureTimeMap
              const time = Number(report.regDttm.split(' ')[1].split(':')[0])
              if(time < 3){
                failureTimeMap.set(0, failureTimeMap.has(0) ? (failureTimeMap.get(0) + 1) : 1);
              }else if(time < 6){
                failureTimeMap.set(3, failureTimeMap.has(3) ? (failureTimeMap.get(3) + 1) : 1);
              }else if(time < 9){
                failureTimeMap.set(6, failureTimeMap.has(6) ? (failureTimeMap.get(6) + 1) : 1);
              }else if(time < 12){
                failureTimeMap.set(9, failureTimeMap.has(9) ? (failureTimeMap.get(9) + 1) : 1);
              }else if(time < 15){
                failureTimeMap.set(12, failureTimeMap.has(12) ? (failureTimeMap.get(12) + 1) : 1);
              }else if(time < 18){
                failureTimeMap.set(15, failureTimeMap.has(15) ? (failureTimeMap.get(15) + 1) : 1);
              }else if(time < 21){
                failureTimeMap.set(18, failureTimeMap.has(18) ? (failureTimeMap.get(18) + 1) : 1);
              }else{
                failureTimeMap.set(21, failureTimeMap.has(21) ? (failureTimeMap.get(21) + 1) : 1);
              }


            })
          };

          for(let [key, value] of failureTimeMap){
            const formatData = {
              'time': key,
              'cnt': value
            }
            failTimes.push(formatData)
          }

          for(let [key, value] of failureTypeMap){
            const formData = {
              type: key,
              cnt: value
            }
            failTypes.push(formData)
          }
          console.log(failTimes);
          console.log(failTypes);
          

          if(usageReport){
            setTotalUsage(usageReport.list_total_count);
          }

          setIsLoading(false);
        }catch(err){
          console.log(err);
        }
      }

      fetchData();
    }

  },[date])

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
                  <FailureTypePieChart data={failTypes} />
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

              {/* 2-1. 이용 시간대 */}
              <div className="bg-white rounded-lg border shadow-lg w-full 2xl:max-w-fit p-4 px-8">
                <h3 className='pb-4 w-full flex justify-end text-slate-500'>이용 시간 통계</h3>
                <div className='relative w-full 2xl:w-[420px] h-[300px]'>
                  <TimeBarChart />
                </div>
              </div>

              {/* 2-2. 대여 연령대 */}
              <div className="bg-white border w-full shadow-lg 2xl:max-w-fit rounded-lg p-4 px-8">
                <h3 className='border-b pb-4 w-full text-slate-500'>대여 연령대</h3>
                <h1 className='text-slate-500 mt-4 text-sm'>(참고) 10대는 만 10세부터 만 19세에 해당하는 이용자를 칭합니다.</h1>
                <div className="flex items-center justify-center gap-12">
                  <AgeTypePieChart />
                  <div className="flex flex-col gap-4 mt-4 bg-primary-500 px-10 text-white p-4 rounded-lg shadow-md">

                    {/* 연령대 유형 1 */}
                    <div className='flex items-center justify-between gap-8'>
                      <p className='flex items-center gap-2'><GoDotFill />10 대 <span className='text-sm'>(만 10세 ~ 19세)</span></p>
                      <p className='text-2xl font-black'>25%</p>
                    </div>

                    {/* 연령대 유형 1 */}
                    <div className='flex items-center justify-between gap-8'>
                      <p className='flex items-center gap-2'><GoDotFill />20 대 <span className='text-sm'>(만 20세 ~ 29세)</span></p>
                      <p className='text-2xl font-black'>25%</p>
                    </div>

                    {/* 연령대 유형 1 */}
                    <div className='flex items-center justify-between gap-8'>
                      <p className='flex items-center gap-2'><GoDotFill />30 대 <span className='text-sm'>(만 30세 ~ 39세)</span></p>
                      <p className='text-2xl font-black'>25%</p>
                    </div>

                    {/* 연령대 유형 1 */}
                    <div className='flex items-center justify-between gap-8'>
                      <p className='flex items-center gap-2'><GoDotFill />40 대 <span className='text-sm'>(만 40세 ~ 49세)</span></p>
                      <p className='text-2xl font-black'>25%</p>
                    </div>

                    {/* 연령대 유형 1 */}
                    <div className='flex items-center justify-between gap-10'>
                      <p className='flex items-center gap-2'><GoDotFill /><span>50 대 이상 (만 50세 이상)</span></p>
                      <p className='text-2xl font-black'>25%</p>
                    </div>

                  </div>
                </div>
              </div>


            </div>

          </div>


        </div>
      </div>

    </div>
  )
}

export default DayReport