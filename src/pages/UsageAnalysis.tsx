import { useEffect, useState } from "react";
import { Button } from "../components"
import axios from 'axios';
import patterImg from '../../public/assets/images/vector_pattern.svg'
import UserAnalysisThumb from "../components/UserAnalysisThumb";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { FiBarChart } from "react-icons/fi";
import { HiOutlineRefresh } from "react-icons/hi";
import DropDownSelect from "../components/DropDownSelect";
import formatData from "../components/utils/formatData";
import Loader from "../components/Loader";
import MontlyUsageLineChart from "../components/charts/MontlyUsageLineChart";
import { GoDotFill } from "react-icons/go";
import MontlyUsageBarChart from "../components/charts/MontlyUsageBarChart";


const UsageAnalysis = () => {

  const [month, setMonth] = useState<number>(202312)
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRentCnt, setTotalRentCnt] = useState<number>(0); // 한달간 총 대여 수
  const [totalMoveTime, setTotalMoveTime] = useState<number>(0); // 이용 시간 총합 (평균 이용 시간 구할 때 사용)
  const [totalMoveDist, setTotalMoveDist] = useState<number>(0); // 이동거리 총합 (평균 이동 시간 구할 때 사용)
  const [totalSavedCarb, setTotalSavedCarb] = useState<number>(0); // 총 절약 탄소량 
  const [topFiveStation, setTopFiveStation] = useState<any>([]);

  const keyConfig = {
    API_KEY : import.meta.env.VITE_API_KEY
  }
  
  useEffect(() => {    
    const fetchData = async() =>{
      try {
        // const url = import.meta.env.PROD ? 
        // baseURL: import.meta.env.PROD ? "" : "http://localhost:3000",

        const url = process.env.VITE_API_KEY ? 
        `http://openapi.seoul.go.kr:8088/${process.env.API_KEY}/json/tbCycleRentUseMonthInfo/1/1000/${month}` :
        `http://openapi.seoul.go.kr:8088/${keyConfig.API_KEY}/json/tbCycleRentUseMonthInfo/1/1000/${month}`;

        setLoading(true);
        const {data} = await axios.get(url);
        const response = data.cycleRentUseMonthInfo;
        
      
        let totalRentCntSum = 0
        let totalMoveTimeSum = 0;
        let totalMoveDistSum = 0;
        let totalSavedCarbSum = 0;
        let findTopStations :any = [];

        response.row.map((info:any) => {
          // 총 대여수 구하기
          // 대여수 USE_CNT
          totalRentCntSum += info.USE_CNT ? parseInt(info.USE_CNT) : 0;
          setTotalRentCnt(totalRentCntSum);

          // 이용시간 전체 평균
          // MOVE_TIME의 총합 / 총 대여수
          // 단위는 분(min)
          totalMoveTimeSum += info.MOVE_TIME ? parseInt(info.MOVE_TIME) : 0;
          setTotalMoveTime(totalMoveTimeSum);

          // 이동거리 전체 평균
          // MOVE_METER / 총 대여수
          // 단위는 미터(m) - Math.floor로 내림하기
          totalMoveDistSum += info.MOVE_METER ? Math.floor(parseInt(info.MOVE_METER)) : 0
          setTotalMoveDist(totalMoveDistSum);

          // 총 탄소 절감량 
          // CARBON_AMT 의 total
          // 단위는 킬로그램(kg)
          totalSavedCarbSum += info.CARBON_AMT ? parseInt(info.CARBON_AMT) : 0;
          setTotalSavedCarb(totalSavedCarbSum)

          // top 5 대여소 안에 드는지 확인
          if(findTopStations.length < 5 || info.USE_CNT > parseInt(findTopStations[findTopStations.length-1].USE_CNT)){
            findTopStations.push(info);
            findTopStations.sort((a: any,b : any) => parseInt(b.USE_CNT) - parseInt(a.USE_CNT));
            
            if(findTopStations.length > 5) findTopStations.pop();
          }

        })
        
        setTopFiveStation(findTopStations)
        setLoading(false);

      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  },[month])

  const topFiveData = topFiveStation.map( (station :any) => {
    return {
      name: station.STATION_NAME.split('.')[1].trim(),
      carb: parseInt(station.CARBON_AMT),
      use_time: parseInt(station.MOVE_TIME),
      use_dist: parseInt(station.MOVE_METER)/1000,
      use_cnt: parseInt(station.USE_CNT)
    }
  })

  if(loading || !topFiveData[0]){
    return (
      <div className="w-full h-screen flex items-center justify-center gap-4">
        <Loader />
        <p className="text-2xl font-black">{formatData(month)}의 정보를 불러오는 중입니다 . . .</p>
      </div>
    )
  }
  
  return (
    <div className="my-12 relative">


      {/* select box & text */}
      <div className="flex items-center w-full justify-center">
        <DropDownSelect options={[202312, 202311, 202310, 202309, 202308]} month={month} setMonth={setMonth} />
        <p className="relative px-4 text-center text-slate-500">
          해당 통계는 {formatData(month)}, 서울의 1000개의 따릉이 대여소를 기반으로 분석한 자료입니다.
        </p>
      </div>


      {/* 상단 : 총 대여 건수 / 박스 4개 */}
      <div className="flex flex-wrap justify-center relative pt-8">
        
        {/* 총 대여 건수 container */}
        <div className="relative border-red border bg-white overflow-hidden shadow-md h-44 rounded-xl w-full max-w-4xl p-8 pt-9 m-3 bg-center">
          <img 
            src={patterImg}
            alt="vector_image"
            className="absolute -top-2 -right-0 w-[14rem] h-[14rem] z-[1]"
          />
          <div className="flex justify-between items-center z-[2] relative">
            <div>
            <p className="font-bold text-gray-600">총 대여 건수</p>
              <p className="text-2xl">{totalRentCnt.toLocaleString('ko-KR')}회</p>
            </div>
          </div>
          <div className="mt-4 relative z-[2]">
            <Button color="white" bgColor="green" text="더보기" borderRadius="10px" size="md" />
          </div>
        </div>

        {/* 이용 & 이동 평균, 탄소, 나무 box - 4개 */}
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          <UserAnalysisThumb 
            title="이용시간 평균" 
            iconColor="#03C9D7" 
            iconBg="#E5FAFB" 
            amount={`${Math.floor(totalMoveTime / totalRentCnt)} 분`} 
            icon={<MdOutlineSupervisorAccount />} 
          />
          <UserAnalysisThumb 
            title="이용거리 평균" 
            iconColor='rgb(255, 244, 229)' 
            iconBg='rgb(254, 201, 15)' 
            amount={`${Math.floor(totalMoveDist / totalRentCnt)} 미터`} 
            icon={<BsBoxSeam />} 
          />
          <UserAnalysisThumb 
            title="탄소 절감량 총합" 
            iconColor='rgb(228, 106, 118)' 
            iconBg='rgb(255, 244, 229)' 
            amount={`${totalSavedCarb} kg`} 
            icon={<FiBarChart />} 
          />
          <UserAnalysisThumb 
            title="살린 나무의 수 (1그루=6.6kg)" 
            iconColor='rgb(0, 194, 146)' 
            iconBg='rgb(235, 250, 242)' 
            amount={`${Math.floor(totalSavedCarb / 6.6)} 그루`} 
            icon={<HiOutlineRefresh />} 
          />

        </div>
      </div>

      {/* 하단의 컴포넌트 : 대여소별 비교 분석 차트 2개 / 요약 */}
      <div className="flex flex-wrap gap-8 items-center justify-center my-2 px-4">
        
        {/* 하단의 상단 컨테이너 - line & bar */}
        <section className="flex flex-col justify-center border bg-white rounded-xl shadow-lg p-4">

          {/* title */}
          <>
            <h1 className="font-semibold text-xl">대여소별 비교 분석</h1>
            <p className="text-slate-500 text-sm mt-1">대여 건수가 가장 많았던 대여소 5곳을 선별하여 비교 분석했습니다.</p>
          </>

          {/* charts */}
          <div className="flex flex-wrap gap-8 justify-center mt-8">

            {/* line chart container */}
            <div className="flex flex-col px-8 p-2 gap-8">

              {/* top 2 비교 */}
              <div className="flex flex-col gap-4">
                {/* 1등 */}
                <div className="flex flex-col">
                  <p className="text-gray-500 mt-1">{topFiveData[0].name}</p>
                    <p className="text-xl flex items-center">
                      <span className="text-3xl font-semibold">{topFiveData[0].use_cnt} 대</span>
                  </p>
                </div>
                {/* 2등 */}
                <div className="flex flex-col">
                  <p className="text-gray-500 mt-1">{topFiveData[1].name}</p>
                  <span className="text-3xl font-semibold">{topFiveData[1].use_cnt} 대</span>
                </div>
              </div>

              {/* line chart */}
                <div className="w-[400px] h-[200px] mt-4">
                  <MontlyUsageLineChart topFiveData={topFiveData} />
                </div>
            </div>

            {/* bar chart container */}
            <div className="flex flex-col gap-8 p-2 w-[380px]">

              {/* standards - 이용 시간, 이용 거리  */}
              <div className="flex justify-end gap-4">
                <p className="flex items-center text-gray-600">
                  <GoDotFill /><span>이용 거리</span>
                </p>
                <p className="flex items-center text-primary-500">
                  <GoDotFill /><span>이용 시간</span>
                </p>
              </div>

              {/* line chart container */}
              <div className="w-[400px] h-[360px]">
                <MontlyUsageBarChart topFiveData={topFiveData} />
              </div>

            </div>

          </div>
        </section>

        {/* 하단의 하단 컨테이너 - pie */}
        <section className="flex">

          <div className="flex flex-col gap-6 w-[900px]">

            {/* 요약 */}
            <div className="w-full flex flex-col justify-between border p-4 py-8 bg-white shadow-lg rounded-lg">
              <div>
                <p className="font-black text-xl pb-6 border-b">[ 통계 요약 ]</p>
                <p className="pt-8">{formatData(month)} 1000개의 대여소 중 가장 대여 건수가 많았던 대여소는 차례대로 {topFiveData[0].name}, {topFiveData[1].name}, {topFiveData[2].name}, {topFiveData[3].name}, {topFiveData[4].name} 입니다.</p>
                <p>가장 대여 건수가 많았던 {topFiveData[0].name}에서는 한 달간 {topFiveData[0].use_cnt}번의 따릉이를 대여했으며, 이는 {formatData(month)} 총 대여 건수의 {(topFiveData[0].use_cnt / totalRentCnt).toFixed(2)}%에 해당합니다.
                  두번째로 대여 건수가 많았던  {topFiveData[1].name}에서는 한달간 약 888건의 따릉이를 대여했으며, {topFiveData[0].name} 대여소와 {topFiveData[1].name} 대여소의 한달간 대여 건수는 약 {topFiveData[0].use_cnt - topFiveData[1].use_cnt}건 차이납니다.
                </p>
                <a href="http://data.seoul.go.kr/dataList/OA-15248/F/1/datasetView.do" target="_blank">
                  <p className="mt-4 text-sm text-blue-500">관련 자료 자세히 보기 'click'</p>
                </a>
              </div>

              <div className="flex flex-col mt-16 text-sm">
                <p className="text-slate-500">모든 자료의 출처는 {'<서울 열린데이터 광장>'}의 '공공자전거이용정보'이며 자료 권한은 서울특별시에 있음을 알립니다.</p>
                <div className="flex gap-4 text-blue-500">
                  <a target="_blank" href="https://www.seoul.go.kr/main/index.jsp" className="hover:">- 서울 열린데이터 광장 링크</a>
                  <a target="_blank" href="https://data.seoul.go.kr/index.do">- 서울특별시 홈페이지 링크</a>
                  <a  target="_blank"href="https://www.bikeseoul.com">- 따릉이 홈페이지 링크</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  )
}

export default UsageAnalysis