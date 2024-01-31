
type Props = {
  title: string;
  iconColor: string;
  iconBg: string;
  icon: JSX.Element;
  amount: string;
  pcColor: string;
  percentage: string;
}

const UserAnalysisThumb = ({title, iconColor, iconBg, icon, amount, pcColor, percentage}: Props) => {
  return (
    <div key={title} className="bg-white border shadow-md dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl">
      <button type="button" style={{color: iconColor, backgroundColor: iconBg}} className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl" >
        {icon}
      </button>
      <p className="mt-3">
        <span className="text-lg font-semibold">{amount && amount}</span>
        <span className={`text-sm text-${pcColor} ml-2`}>{percentage}</span>
      </p>
      <p className="text-sm text-gray-500 mt-1">{title}</p>
    </div>
  )
}

export default UserAnalysisThumb