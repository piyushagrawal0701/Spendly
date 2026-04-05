import RecentIncome from '../Components/Dashboard/RecentIncome'
import RecentIncomeWithChart from '../Components/Dashboard/RecentIncomeWithChart'
import RecentTransactions from '../Components/Dashboard/RecentTransactions';
import { useTransactions } from '../Context/TransactionContext';

const Income = () => {

    const { transactions } = useTransactions();
  
  return (
    <>
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
        <RecentIncome transactions={transactions}/>
        <RecentIncomeWithChart transactions={transactions}/>
      </div>
        <RecentTransactions transactions={transactions}/>
    </section>
    </>
  )
}

export default Income