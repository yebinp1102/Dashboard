import axios from "axios";
import { useEffect } from "react"

const UserAnalysis = () => {

  useEffect(() => {
    // const url = `http://openapi.seoul.go.kr:8088/${import.meta.env.VITE_API_KEY}/json/cycleNewMemberRentInfoMonths/1/1000/202312`;
    const url = `http://openapi.seoul.go.kr:8088/${import.meta.env.VITE_API_KEY}/json/cycleNewMemberRentInfoMonths/1/5/202301/`;
    const fetchData = async () => {
      try{
        const {data} = await axios.get(url);
        console.log(data);

      }catch(err){
        console.log(err);
      }
    }

    fetchData()
  },[])

  return (
    <div>UserAnalysis</div>
  )
}

export default UserAnalysis