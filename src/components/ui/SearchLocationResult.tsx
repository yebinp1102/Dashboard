import { GrBike } from "react-icons/gr";

type Props = {
  bikes: string;
  location: string;
  address: string;
}

const SearchLocationResult = ({bikes, location, address} : Props) => {
  return (
    <div className='border flex py-2 px-4 items-center justify-between'>
      <div className='flex gap-6 items-center'>
        <p className='text-3xl text-primary-500'>
          <GrBike />
        </p>
        <div>
          {location}
          <p className='text-sm text-slate-500'>{address}</p>
        </div>
      </div>

      {/* 대여 가능한 자전거 수 */}
      <p>대여 가능한 따릉이 : <span className='text-primary-500 text-xl font-black'>{bikes ? bikes : 0}</span> 대</p>
    </div>
  )
}

export default SearchLocationResult