import { LuArrowRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const ExpenseTransactions = ({transactions}) => {
  const navigate = useNavigate();

    const expenseData = transactions.filter(t => t.type === "expense");

  return (
    <>
      <section className="card bg-gradient-to-b from-[#2A0150] to-[#090025] border-violet-100 p-6 rounded-2xl shadow-md  border  mx-4">
        <div className="flex items-center justify-between">
          <h5 className="text-lg bg-gradient-to-r from-white to-[#b26ee3] text-transparent bg-clip-text font-medium">
            Expenses
          </h5>

          <button
            className="flex items-center gap-3 text-[12px] font-medium text-primary hover:text-white bg-white hover:bg-gradient-to-r hover:from-[#7c3aed] hover:to-[#9333ea] max-md:text-nowrap px-4 py-1.5 rounded-lg border border-[#26263a] hover:border-transparent transition-all duration-300 cursor-pointer"
            onClick={() => navigate("/expense")}
          >
            See All <LuArrowRight className="text-base" />
          </button>
        </div>

        <div className="mt-6">
          {expenseData.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item.id}
              title={item.title}
              date={moment(item.date).format("DD MMM YYYY")}
              amount={item.amount}
              icon={item.icon}
              type="expense"
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default ExpenseTransactions;
