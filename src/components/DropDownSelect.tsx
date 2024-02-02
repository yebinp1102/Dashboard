import React, { useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import formatData from "./utils/formatData";

type Props = {
  options: number[],
  setMonth : React.Dispatch<React.SetStateAction<number>>,
  month: number,
}

const DropDownSelect = ({options, setMonth, month} : Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative z-20">
      <button 
        className='bg-gray-400 flex gap-1 items-center hover:bg-gray-500 hover:shadow-xl px-3 text-white rounded-md py-1 shadow-md'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {formatData(month)}
        {isExpanded ? <TiArrowSortedUp size={20} /> : <TiArrowSortedDown size={20} />}
      </button>
      {isExpanded && (
        <ul className="absolute bg-white rounded-lg mt-2 w-[140px] border shadow-lg">
          {options.map(option => (
            <li 
              key={option} 
              className="cursor-pointer hover:bg-primary-500 hover:text-white px-4 py-2 rounded-md"
              onClick={() => {
                setMonth(option);
                setIsExpanded(!isExpanded)
              }}
            >
              {formatData(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DropDownSelect