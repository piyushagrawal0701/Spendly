import { LuArrowUpRight, LuArrowDownRight } from "react-icons/lu";

const TransactionInfoCard = ({ title, date, amount, type, icon }) => {
  const isIncome = type === "income";

  return (
    <div className="flex items-center justify-between py-4 border-b border-[#26263a] last:border-none hover:cursor-pointer hover:bg-primary-dark/10 hover:px-2 transition-all ease-in">

      {/* Left Side */}
      <div className="flex items-center gap-4">
        
        {/* Icon */}
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1a1a24] text-gray-300">
          {icon ? icon : "₹"}
        </div>

        {/* Info */}
        <div>
          <p className="text-sm font-medium text-white">{title}</p>
          <p className="text-xs text-gray-400">{date}</p>
        </div>
      </div>

      {/* Right Side */}
      <div
        className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium 
        ${isIncome 
          ? "bg-green-500/10 text-green-400" 
          : "bg-red-500/10 text-red-400"}`}
      >
        {isIncome ? <LuArrowUpRight size={16} /> : <LuArrowDownRight size={16} />}
        
        <span>
          {isIncome ? "+" : "-"}₹{amount}
        </span>
      </div>
    </div>
  );
};

export default TransactionInfoCard;