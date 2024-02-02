
type Props = {
  index: number;
  icon: JSX.Element;
  title: string;
  subText: string;
  bgColor: string;
  color: string;
}

const StepList = ({index, icon, title, subText, bgColor, color} : Props) => {
  return (
    <div className={`${bgColor} bg-primary-500 rounded-2xl px-4 font-point shadow-lg`}>
      <div className="h-full flex items-center gap-3">

        {/* icon */}
        <div className='py-6 px-2 text-4xl text-white w-[75px] flex items-center justify-center'>
          {icon}
        </div>

        {/* index */}
        <div className={`bg-white w-[115px] h-full shadow-2xl flex items-center justify-center text-4xl font-black ${color}`}>
          {index}
        </div>

        {/* Description */}
        <div className="flex flex-col w-full text-white justify-center font-semibold">
          <h1 className='text-xl font-point'>{title}</h1>
          <p className='text-sm'>{subText}</p>
        </div>

      </div>
    </div>
  )
}

export default StepList