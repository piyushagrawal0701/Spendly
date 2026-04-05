import { LuArrowRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4F39F6"];

const RecentIncomeWithChart = ({ transactions }) => {
  const navigate = useNavigate();

  // ✅ Filter income
  const incomeData = transactions.filter((t) => t.type === "income");

  // ✅ Prepare chart data (group by category/title)
  const chartData = Object.values(
    incomeData.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = {
          name: item.category,
          amount: 0,
        };
      }
      acc[item.category].amount += item.amount;
      return acc;
    }, {})
  );

  // ✅ Total income
  const totalIncome = incomeData.reduce((sum, t) => sum + t.amount, 0);

  return (
    <section className="card bg-gradient-to-b from-[#2A0150] to-[#090025] border-violet-100 p-6 rounded-2xl shadow-md border mx-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h5 className="text-lg bg-gradient-to-r from-white to-[#b26ee3] text-transparent bg-clip-text font-medium">
          Income Breakdown
        </h5>

        <button
          className="flex items-center gap-3 text-[12px] font-medium text-white 
          bg-[#1a1a24] hover:bg-gradient-to-r hover:from-[#7c3aed] hover:to-[#9333ea] 
          px-4 py-1.5 rounded-lg border border-[#26263a] 
          hover:border-transparent transition-all duration-300 cursor-pointer"
          onClick={() => navigate("/income")}
        >
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      {/* Chart */}
      <div className="mt-6">
        <CustomPieChart
          data={chartData}
          colors={COLORS}
          totalAmount={`₹${totalIncome}`}
          label="Total Income"
          showTextAnchor
        />
      </div>
    </section>
  );
};

export default RecentIncomeWithChart;