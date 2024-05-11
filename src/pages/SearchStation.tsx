import { useEffect, useState } from 'react'
import KaKaoMap from '../components/ui/KaKaoMap'
import axios from 'axios';
import Loader from '../components/Loader';
import SearchLocationResult from '../components/ui/SearchLocationResult';

declare global {
  interface Window {
    kakao: any;
  }
}

export type LocationInfoType = {
  location?: string;
  lon?: number;
  lat?: number;
}

const SearchStation = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<any[]>();

  const url = `http://openapi.seoul.go.kr:8088/${import.meta.env.VITE_API_KEY}/json/tbCycleStationInfo/1/1000`;
  
  const [searchLocation, setSearchLocation] = useState<LocationInfoType>();
  

  // 검색한 장소의 위치 정보(도로명, 위도, 경도)를 searchLocation에 저장하는 함수
  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter' && searchInput){
      e.preventDefault();
      // 검색 지역의 정보 찾기 (주소명, 경도, 위도)
      let geocoder = new window.kakao.maps.services.Geocoder();
      const response = async (result : any, status: any) => {
        if(status === window.kakao.maps.services.Status.OK){
          const formData = {
            location: result[0].address_name,
            lon: Number(result[0].x), // 경도
            lat: Number(result[0].y),  // 위도
          }
          setSearchLocation(formData);
        }
      }

      geocoder.addressSearch(searchInput ,response);
    }
  }

  useEffect(() => {
    
    const fetchData = async() => {
      setIsLoading(true);

      // 지도 UI 생성
      const {data} = await axios.get(url);
      const response = data.stationInfo.row;
      
      let nearByStations:any[] = [];
      response.map((station: any) => {
        // 위도(lat) lat +- 0.009
        // 경도(lon) lon +- 0.009
        // 둘다 만족해야함 station.STA_LAT, station.STA_LONG
        if(station.STA_LAT >= searchLocation!.lat! - 0.009 &&
            station.STA_LAT <= searchLocation!.lat! + 0.009 && 
            station.STA_LONG >= searchLocation!.lon! - 0.009 &&
            station.STA_LONG <= searchLocation!.lon! + 0.009
          ){
            const formData = {
              RENT_NO: station.RENT_NO,
              bikes: station.HOLD_NUM,
              location: station.RENT_NM,
              address: station.STA_ADD1+' '+station.STA_ADD2,
              lat: station.STA_LAT,
              lon: station.STA_LONG
            }
            nearByStations.push(formData);
          }
      })
      setSearchResult(nearByStations);
      // console.log('가까운 대여소 :',nearByStations);

      setIsLoading(false);
    }
    if(searchLocation) fetchData();
  },[searchLocation])

  return (
    <div className='my-20 px-4 mx-auto h-full flex items-center justify-center'>

    

      <div className='flex flex-wrap gap-8 justify-center'>
        {/* map */}
        <KaKaoMap searchLocation={searchLocation} searchResult={searchResult} />


        {/* search results */}
        <div className='flex flex-col gap-4 bg-white w-[850px] min-h-[500px] border shadow-lg rounded-lg py-6 px-8'>
          <div className="flex items-center gap-2 mb-4">
            <div className='text-xl font-black'>대여소 검색 :</div>
            {/* 검색 UI */}
            <input 
              type="text" 
              className='flex-1 border-b border-slate-400 p-2 placeholder:text-sm' 
              placeholder='주소를 입력하면 주소지 근처 대여소를 찾습니다.'
              value={searchInput}
              onChange={(e) => {
                e.preventDefault();
                setSearchInput(e.target.value);
              }}
              onKeyDown={handleSearch}
            />
          </div>


          {/* 검색 결과 */}
          {isLoading ? (
            <div className='h-full w-full flex items-center gap-2 justify-center'>
              <Loader /> <span className='font-black text-xl'>근처 대여소를 찾는 중입니다. . . .</span>
            </div>
          ) : (
            <div>

              <ul className="flex flex-col gap-1">
                {!searchResult ? (
                  <div>근처에 대여소가 없습니다. 다른 검색어를 입력해 주세요.</div>
                ): (
                  <div>
                    <p className='text-slate-500 text-sm mb-4'>입력하신 '{searchLocation!.location}' 근처에 위치한 {searchResult.length}개의 정류소를 찾았습니다.</p>
                    {searchResult.map((station: any) => (
                      <SearchLocationResult key={station.RENT_NO} bikes={station.bikes} location={station.location} address={station.address}  />
                    ))}
                  </div>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchStation