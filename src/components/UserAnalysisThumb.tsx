
type Props = {
  title: string;
  iconColor: string;
  iconBg: string;
  icon: JSX.Element;
  amount: string;
}

const UserAnalysisThumb = ({title, iconColor, iconBg, icon, amount}: Props) => {
  return (
    <div key={title} className="bg-white border shadow-md md:w-56 p-4 pt-9 rounded-2xl">
      <button type="button" style={{color: iconColor, backgroundColor: iconBg}} className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl" >
        {icon}
      </button>
      <p className="mt-3">
        <span className="text-lg font-semibold">{amount && amount}</span>
      </p>
      <p className="text-sm text-gray-500 mt-1">{title}</p>
    </div>
  )
}

export default UserAnalysisThumb