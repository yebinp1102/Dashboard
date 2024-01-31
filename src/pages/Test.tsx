import AreaChart from '../components/charts/AreaChart'
import BarChart from '../components/charts/BarChart'
import LineChart from '../components/charts/LineChart'


const Test = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-10 py-44'>
      <div className="grid grid-cols-2 w-full gap-10">

        <div className="flex flex-col items-center justify-center p-4 border shadow-lg rounded-xl h-[400px]">
          <h3 className='text-2xl font-semibold mb-4'>Area Chart</h3>
          <AreaChart />
        </div>

        <div className="flex flex-col items-center justify-center p-4 border shadow-lg rounded-xl h-[400px]">
          <h3 className='text-2xl font-semibold mb-4'>Area Chart</h3>
          <BarChart />
        </div>

        <div className="flex flex-col items-center justify-center p-4 border shadow-lg rounded-xl h-[400px]">
          <h3 className='text-2xl font-semibold mb-4'>Line Chart</h3>
          <LineChart />
        </div>
      </div>
    </div>
  )
}

export default Test