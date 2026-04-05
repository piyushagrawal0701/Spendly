import { createContext, useContext, useEffect, useState } from "react";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
const [transactions, setTransactions] = useState(() => {
  const stored = localStorage.getItem("transactions");
  return stored
    ? JSON.parse(stored)
    : [
        {
          id: 1,
          title: "Salary",
          amount: 50000,
          type: "income",
          category: "Job",
          date: "2025-02-01",
          icon: "💼",
        },
        {
          id: 2,
          title: "Freelance Project",
          amount: 12000,
          type: "income",
          category: "Freelance",
          date: "2025-02-05",
          icon: "🧑‍💻",
        },
        {
          id: 3,
          title: "Rent Payment",
          amount: 10000,
          type: "expense",
          category: "Rent",
          date: "2025-02-03",
          icon: "🏠",
        },
        {
          id: 4,
          title: "Groceries",
          amount: 2500,
          type: "expense",
          category: "Food",
          date: "2025-02-06",
          icon: "🛒",
        },
        {
          id: 5,
          title: "Netflix Subscription",
          amount: 499,
          type: "expense",
          category: "Entertainment",
          date: "2025-02-07",
          icon: "🎬",
        },
      ];
});

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (tx) => {
    setTransactions((prev) => [tx, ...prev]);
  };
  const clearTransactions = () => {
  setTransactions([]);
};

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, clearTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);