import { useEffect, useState } from "react";
import { Button } from "../components"
// import { SparklineAreaData } from "../data/dummy"
import { GoDotFill } from "react-icons/go";
import axios from 'axios';
import patterImg from '../../public/assets/images/vector_pattern.svg'
import UserAnalysisThumb from "../components/UserAnalysisThumb";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { FiBarChart } from "react-icons/fi";
import { HiOutlineRefresh } from "react-icons/hi";
import MontlyLineChart from "../components/charts/MontlyLineChart";

const UserAnalysis = () => {
  // const [monthInfo, setMonthInfo] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRentCnt, setTotalRentCnt] = useState<number>(0); // 한달간 총 대여 수
  const [totalMoveTime, setTotalMoveTime] = useState<number>(0); // 이용 시간 총합 (평균 이용 시간 구할 때 사용)
  const [totalMoveDist, setTotalMoveDist] = useState<number>(0); // 이동거리 총합 (평균 이동 시간 구할 때 사용)
  const [totalSavedCarb, setTotalSavedCarb] = useState<number>(0); // 총 절약 탄소량 

  const keyConfig = {
    API_KEY : import.meta.env.VITE_API_KEY
  }
  
  useEffect(() => {    
    const fetchData = async() =>{
      try {
        const url = `http://openapi.seoul.go.kr:8088/${keyConfig.API_KEY}/json/tbCycleRentUseMonthInfo/1/1000/202312`;

        setLoading(true);
        const {data} = await axios.get(url);
        const response = data.cycleRentUseMonthInfo;
        
      
        let totalRentCntSum = 0
        let totalMoveTimeSum = 0;
        let totalMoveDistSum = 0;
        let totalSavedCarbSum = 0;

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

          // 나무 수 
          // 나무 한 그루당 6.6 kg의 탄소를 흡수함
          // 총 탄소 절감 / 6.6 kg - Math.floor로 내림하기

        })

        // setMonthInfo(response);
        setLoading(false);

      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  },[])

  
  return (
    <div className="mt-12">
      {loading ? 'loading . . .' : (
        <p className="text-center text-slate-500">
          해당 통계는 2023년 12월, 서울의 1000개의 따릉이 대여소를 기반으로 분석한 자료입니다.
        </p>
      )}
      <div className="flex flex-wrap justify-center">
        <div className="relative border bg-white overflow-hidden shadow-md dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full max-w-4xl p-8 pt-9 m-3 bg-center">
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

        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          <UserAnalysisThumb 
            title="이용시간 평균" 
            iconColor="#03C9D7" 
            iconBg="#E5FAFB" 
            pcColor="red-600" 
            percentage="-4%" 
            amount={`${Math.floor(totalMoveTime / totalRentCnt)} 분`} 
            icon={<MdOutlineSupervisorAccount />} 
          />
          <UserAnalysisThumb 
            title="이용거리 평균" 
            iconColor='rgb(255, 244, 229)' 
            iconBg='rgb(254, 201, 15)' 
            pcColor="green-600" 
            percentage="+23%" 
            amount={`${Math.floor(totalMoveDist / totalRentCnt)} 미터`} 
            icon={<BsBoxSeam />} 
          />
          <UserAnalysisThumb 
            title="탄소 절감량 총합" 
            iconColor='rgb(228, 106, 118)' 
            iconBg='rgb(255, 244, 229)' 
            pcColor="green-600" 
            percentage="+38%" 
            amount={`${totalSavedCarb} kg`} 
            icon={<FiBarChart />} 
          />
          <UserAnalysisThumb 
            title="살린 나무의 수 (1그루=6.6kg)" 
            iconColor='rgb(0, 194, 146)' 
            iconBg='rgb(235, 250, 242)' 
            pcColor="red-600" 
            percentage="-12%" 
            amount={`${Math.floor(totalSavedCarb / 6.6)} 그루`} 
            icon={<HiOutlineRefresh />} 
          />

        </div>
      </div>

      {/* chart */}
      <div className="flex gap-10justify-center w-full">
        <div className="bg-white w-full max-w-6xl mx-auto dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-[780px] border shadow-lg">
            <div className="flex justify-between">
              <p className="font-semibold text-xl">월별 비교 분석</p>

              <div className="flex items-center gap-4">
                <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                  <span className=""><GoDotFill /></span>
                  <span>총 대여 건수</span>
                </p>
                <p className="flex items-center gap-2 text-blue-500 hover:drop-shadow-xl">
                  <span className=""><GoDotFill /></span>
                  <span>탄소 절감량 총합</span>
                </p>
              </div>
            </div>

            <div className="flex gap-10 flex-wrap justify-center mt-10">


              {/* 비용 & 예산 */}
              <div className="border-r-1 border-color m-4 pr-10">

                {/* 12월 탄소 */}
                <div>
                  <p className="text-xl">
                    <span className="text-3xl font-semibold">총 {totalSavedCarb.toLocaleString('ko-KR')} kg</span>
                    <span className="py-1.5 px-3 hover:drop-shadow-xl cursor-pointer rounded-full bg-green-700 ml-3 text-base text-white">23%</span>
                  </p>
                  <p className="text-gray-500 mt-1">12월</p>
                </div>

                {/* 11월 탄소 */}
                <div className="mt-8">
                  <p className="text-xl">
                    <span className="text-3xl font-semibold">총 48, 438 kg</span>
                  </p>
                  <p className="text-gray-500 mt-1">11월</p>
                </div>

                {/* spark line graph */}
                <div className="w-[400px] h-[200px]">
                  <MontlyLineChart totalSavedCarb={totalSavedCarb} />
                </div>

              </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default UserAnalysis