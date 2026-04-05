import TransactionForm from "../Components/Admin/TransactionForm";
import { useTransactions } from "../Context/TransactionContext";

const Admin = () => {
  const { addTransaction } = useTransactions();

  return <TransactionForm onAdd={addTransaction} />;
};

export default Admin;