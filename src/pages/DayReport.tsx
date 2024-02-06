import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import FailureTypePieChart from '../components/charts/FailureTypePieChart';
import { GoDotFill } from "react-icons/go";
import AreaChartCopyComponent from '../components/charts/AreaChartCopy';
import AgeTypePieChart from '../components/charts/AgeTypePieChart';
import TimeBarChart from '../components/charts/TimeBarChart';
import { FailureTimeType, FailureTypesType, UsageAgeType, UsageTimeType } from '../types';
import PieChartKey from '../components/ui/PieChartKey';

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
  const [totalFailure, setTotalFailure] = useState<number>(0);
  const COLORS = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042', '#F03A47', '#395C6B'];

  let failureTypeMap = new Map();
  const [failureTypesArr, setFailureTypesArr] = useState<any>();
  let failureTimeMap = new Map();
  const [failureTimesArr, setFailureTimesArr] = useState<any>();
  let failTypes: FailureTypesType[] = [];
  let failTimes: FailureTimeType[] = []

  let usageAgeMap = new Map();
  let usageTimeMap = new Map();
  let usageAges: UsageAgeType[] = [];
  let usageTimes:UsageTimeType[] = []
  const [usageAgesArr, setUsageAgesArr] = useState<any>();
  const [usageTimesArr, setUsageTimesArr] = useState<any>();

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

          failureTypeMap.clear();
          failureTimeMap.clear();
          usageAgeMap.clear();
          usageTimeMap.clear();

          failTypes = [];
          failTimes = [];
          usageAges = [];
          usageTimes = [];


          if(failureReport){
            setTotalFailure(Number(failureReport.list_total_count))
            
            failureReport.row.forEach((report:any) => {

              // 고장 유형 통계 - map 객체 업데이트
              const failureType = report.mlangComCdName.trim();
              if(failureTypeMap.has(failureType)){
                failureTypeMap.set(failureType, failureTypeMap.get(failureType)+1)
              }else{
                failureTypeMap.set(failureType, 1)
              }

              // 고장 접수 시간대 통계 -> failureTimeMap 갱신
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


          // 고장 유형 데이터 구조화 (Map 객체 -> 배열)
          for(let [key, value] of failureTypeMap){
            const formData = {
              type: key,
              cnt: value
            }
            failTypes.push(formData)
          }
          failTypes.sort((a,b) => b.cnt - a.cnt)
          setFailureTypesArr(failTypes)


          // 고장 시간대 데이터 구조화 (Map 객체 -> 배열)
          for(let [key, value] of failureTimeMap){
            const formatData = {
              time: key,
              cnt: value
            }
            failTimes.push(formatData)
          }

          setFailureTimesArr(failTimes);

          if(usageReport){
            usageReport.row.forEach((report:any) => {
              // AGE_TYPE: ~10대 (~split[1])
              // MOVE_TIME: "98"

              // 이용 시간 통계
              // MOVE_TIME: "98"
              const move_time = Number(report.MOVE_TIME);
              if(move_time <= 30){
                usageTimeMap.set('0~30', usageTimeMap.has('0~30') ? usageTimeMap.get('0~30')+1 : 1)
              }else if(move_time <= 60){
                usageTimeMap.set('31~60', usageTimeMap.has('31~60') ? usageTimeMap.get('31~60')+1 : 1)
              }else if(move_time <= 120){
                usageTimeMap.set('61~90', usageTimeMap.has('61~90') ? usageTimeMap.get('61~90')+1 : 1)
              }else{
                usageTimeMap.set('91 ~', usageTimeMap.has('91 ~') ? usageTimeMap.get('91 ~')+1 : 1)
              }
            

              // 이용 나이대 통계
              const age_type = report.AGE_TYPE
              if(age_type == '~10대'){
                usageAgeMap.set('10대', usageAgeMap.has('10대')? usageAgeMap.get('10대')+1 : 1);
              }else if(age_type == '20대' || '30대' || '40대'){
                usageAgeMap.set(age_type, usageAgeMap.has(age_type)? usageAgeMap.get(age_type)+1 : 1);
              }else{
                usageAgeMap.set('50대 이상', usageAgeMap.has('50대 이상')? usageAgeMap.get('50대 이상')+1 : 1);
              }

            })
          }

          // 이용 시간 데이터 구조화
          for(let [key, value] of usageTimeMap){
            const formData = {
              time: key,
              cnt: value
            }
            usageTimes.push(formData)
          }
          usageTimes.sort((a,b) => Number(a.time.split('~')[0].trim()) - Number(b.time.split('~')[0].trim()) );
          setUsageTimesArr(usageTimes);

          // 이용 나이대 데이터 구조화 
          for(let [key, value] of usageAgeMap){
            const formData = {
              age: key,
              cnt: value
            }
            usageAges.push(formData)
          }
          usageAges.sort((a,b) => Number(a.age.split('대')[0].trim()) - Number(b.age.split('대')[0].trim()) );
          setUsageAgesArr(usageAges);

          setIsLoading(false);
        }catch(err){
          console.log(err);
        }
      }

      fetchData();
    }

  },[date])


  if(isLoading || !failureTypesArr){
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
                  <FailureTypePieChart data={failureTypesArr} colors={COLORS} />
                  <div className='flex flex-col gap-6'>
                    <h1 className='text-xl font-black'>총 고장 횟수 : {totalFailure} 번</h1>
                    {/* 고장 유형 리스트 */}
                    <div className='flex flex-col gap-2 text-primary-500'>

                      {/* pie key 01 */}
                      <div className=' text-[#0088FE]'>
                        <PieChartKey 
                          key={failureTypesArr[0].type} 
                          type={failureTypesArr[0].type}
                          cnt={failureTypesArr[0].cnt}
                          totalCnt={totalFailure}
                        />
                      </div>
                      
                      {/* pie key 02 */}
                      <div className=' text-[#00C49F]'>
                        <PieChartKey 
                          key={failureTypesArr[1].type} 
                          type={failureTypesArr[1].type}
                          cnt={failureTypesArr[1].cnt}
                          totalCnt={totalFailure}
                        />
                      </div>

                      {/* pie key 03 */}
                      <div className=' text-[#FFBB28]'>
                        <PieChartKey 
                          key={failureTypesArr[2].type} 
                          type={failureTypesArr[2].type}
                          cnt={failureTypesArr[2].cnt}
                          totalCnt={totalFailure}
                        />
                      </div>

                      {/* pie key 04 */}
                      <div className=' text-[#FF8042]'>
                        <PieChartKey 
                          key={failureTypesArr[3].type} 
                          type={failureTypesArr[3].type}
                          cnt={failureTypesArr[3].cnt}
                          totalCnt={totalFailure}
                        />
                      </div>

                      {/* pie key 05 */}
                      <div className=' text-[#F03A47]'>
                        <PieChartKey 
                          key={failureTypesArr[4].type} 
                          type={failureTypesArr[4].type}
                          cnt={failureTypesArr[4].cnt}
                          totalCnt={totalFailure}
                        />
                      </div>

                      {/* pie key 06 */}
                      <div className=' text-[#395C6B]'>
                        <PieChartKey 
                          key={failureTypesArr[5].type} 
                          type={failureTypesArr[5].type}
                          cnt={failureTypesArr[5].cnt}
                          totalCnt={totalFailure}
                        />
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* 1-2. 고장 시간대 */}
              <div className='2xl:w-[630px] flex-1 border bg-white rounded-lg shadow-lg py-4 px-6'>
                <h3 className='pb-8 px-2 w-full text-slate-500'>고장 접수 시간대 분석</h3>
                <div className='h-[320px] relative'>
                  <AreaChartCopyComponent data={failureTimesArr} />
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
                  <TimeBarChart data={usageTimesArr} />
                </div>
              </div>

              {/* 2-2. 대여 연령대 */}
              <div className="bg-white border w-full shadow-lg 2xl:max-w-fit rounded-lg p-4 px-8">
                <h3 className='border-b pb-4 w-full text-slate-500'>대여 연령대</h3>
                <h1 className='text-slate-500 mt-4 text-sm'>(참고) 10대는 만 10세부터 만 19세에 해당하는 이용자를 칭합니다.</h1>
                <div className="flex items-center justify-center gap-12 mt-10">
                  <AgeTypePieChart data={usageAgesArr} />
                  <div className="flex flex-col gap-4 bg-primary-500 px-10 text-white p-4 rounded-lg shadow-md">
                    {usageAgesArr.map((type: UsageAgeType) => (
                      <div className='flex items-center justify-between gap-8'>
                        <p className='flex items-center gap-2'><GoDotFill />{type.age} <span className='text-sm'>(만 {type.age.slice(0,2)}세 ~ {Number(type.age.slice(0,2))+9}세)</span></p>
                        <p className='text-2xl font-black'>{((Number(type.cnt)/1000)*100).toFixed(1)}%</p>
                      </div>
                    ))}

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