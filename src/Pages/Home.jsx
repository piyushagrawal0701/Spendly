import MainCards from "../Components/Cards/MainCards";
import ExpenseTransactions from "../Components/Dashboard/ExpenseTransactions";
import FinanceOverview from "../Components/Dashboard/FinanceOverview";
import HeroSection from "../Components/Dashboard/HeroSection";
import RecentIncome from "../Components/Dashboard/RecentIncome";
import RecentIncomeWithChart from "../Components/Dashboard/RecentIncomeWithChart";
import RecentTransactions from "../Components/Dashboard/RecentTransactions";
import MagicBox from "../Components/MagicBox";
import { useTransactions } from "../Context/TransactionContext";

const Home = () => {
  const { transactions } = useTransactions();

  return (
    <>
      <MainCards transactions={transactions} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <RecentTransactions transactions={transactions} />
        <FinanceOverview transactions={transactions} />
        <ExpenseTransactions transactions={transactions} />
        <RecentIncomeWithChart transactions={transactions} />

        <div className="md:col-span-2">
          <RecentIncome transactions={transactions} />
        </div>

      </div>
    <div className="px-2">
            <MagicBox/>
    </div>
    <HeroSection/>
    </>
  );
};

export default Home;