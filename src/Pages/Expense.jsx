
import ExpenseTransactions from '../Components/Dashboard/ExpenseTransactions';
import FinanceOverview from '../Components/Dashboard/FinanceOverview';
import RecentTransactions from '../Components/Dashboard/RecentTransactions';
import { useTransactions } from '../Context/TransactionContext';

const Expense = () => {

    const { transactions } = useTransactions();
  
  return (
    <>
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
        <ExpenseTransactions transactions={transactions}/>
        <FinanceOverview
         transactions={transactions}/>
      </div>
        <RecentTransactions transactions={transactions}/>
    </section>
    </>
  )
}

export default Expense