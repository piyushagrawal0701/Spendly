import balanceIcon from "../../assets/mainCardsIcons/document-calculator.gif"
import incomeIcon from "../../assets/mainCardsIcons/income.gif"
import expenseIcon from "../../assets/mainCardsIcons/money-bag.gif"
const MainCards = ({transactions }) => {

    const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;
  return (
    <>
      <section className="flex flex-col items-start px-4 pb-10">
        <h1 className="text-[32px]/13 md:text-6xl/19 font-semibold text-center max-w-[840px] mt-4 bg-gradient-to-r from-white to-[#5D009F] text-transparent bg-clip-text">
          Dashboard
        </h1>
        <p className="text-gray-200 text-sm text-center max-w-sm sm:mt-2">
          Visualize. Track. Control
        </p>

        <div className="relative max-w-full w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:px-8 md:px-0 mt-8 sm:mt-14">
          {/* Total Balance */}
          <div className="bg-gradient-to-b from-[#2A0150] to-[#090025] hover:-translate-y-1 transition duration-300 border border-violet-900 rounded-lg p-6 space-y-4 min-w-64 hover:cursor-pointer">
            <img className="w-16 rounded-xl" src={balanceIcon} alt="balance"  />
            <div className="flex items-center justify-between">
              <p className="text-md text-gray-400">Total Balance</p>
              <span className="text-green-400 text-xs">+2.5%</span>
            </div>
            <h2 className="text-2xl font-semibold text-white">₹{balance}</h2>
            <p className="text-xs text-gray-400">Updated this month</p>
          </div>

          {/* Income */}
          <div className="bg-gradient-to-b from-[#2A0150] to-[#090025] hover:-translate-y-1 transition duration-300 border border-violet-900 rounded-lg p-6 space-y-4 hover:cursor-pointer">

            <img className="w-16 rounded-xl" src={incomeIcon} alt="income"  />

            <div className="flex items-center justify-between">
              <p className="text-md text-gray-400">Income</p>
              <span className="text-green-400 text-xs">+8.1%</span>
            </div>
            <h2 className="text-2xl font-semibold text-white">₹{income}</h2>
            <p className="text-xs text-gray-400">Compared to last month</p>
          </div>

          {/* Expenses */}
          <div className="bg-gradient-to-b from-[#2A0150] to-[#090025] hover:-translate-y-1 transition duration-300 border border-violet-900 rounded-lg p-6 space-y-4 hover:cursor-pointer">
            <img className="w-16 rounded-xl" src={expenseIcon} alt="expense"  />

            <div className="flex items-center justify-between">
              <p className="text-md text-gray-400">Expenses</p>
              <span className="text-red-400 text-xs">-5.2%</span>
            </div>
            <h2 className="text-2xl font-semibold text-white">₹{expense}</h2>
            <p className="text-xs text-gray-400">Compared to last month</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainCards;
