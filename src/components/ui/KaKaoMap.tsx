import { useEffect } from 'react'
import { LocationInfoType } from '../../pages/SearchStation';

declare global {
  interface Window {
    kakao: any;
  }
}

type searchedLocationType = {
  RENT_NO: string;
    bikes: string;
    location: string;
    address: string;
    lat: string;
    lon: string;
}

type Props = {
  searchLocation?: LocationInfoType,
  searchResult?: searchedLocationType[],
}

const KaKaoMap = ({searchLocation, searchResult}: Props) => {
  const latVal = searchLocation?.lat ? searchLocation?.lat : 33.450701;
  const lonVal = searchLocation?.lon ? searchLocation?.lon : 126.570667;


  // marker 좌표 (여러개)
  const markers: any[] = [
    new window.kakao.maps.LatLng(latVal, lonVal),
  ]

  const setMarkers = (map: any) => {
    markers.forEach((obj) => {
      new window.kakao.maps.Marker({
        map: map,
        position: obj,
        title:'테스트'
      })
    })
  }



  const init = (map: any) => {
    window.kakao.maps.event.addListener(
      map,
      'click',
      function (mouseEvent: any){
        console.log(mouseEvent.latLng)
      }
    )
  }


  useEffect(() => {

    let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    let options = { //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(latVal, lonVal), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };

    let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    const mainMarker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(latVal, lonVal)
    })

    if(searchResult){
      searchResult.map(location => {
        const marker = new window.kakao.maps.LatLng(location.lat, location.lon)
        markers.push(marker);
      })
    }


    init(map);
    mainMarker.setMap(map) // main marker (검색한 곳)
    setMarkers(map); // 주변 대여소 marker


  }, [searchLocation, searchResult])


  return (
    <div id='map' className='w-[850px] h-[500px] border shadow-lg' />
  )
}

export default KaKaoMap