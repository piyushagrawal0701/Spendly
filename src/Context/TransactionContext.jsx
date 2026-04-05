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
            amount: 5600,
            type: "income",
            category: "Salary",
            date: "2025-02-01",
          },
          {
            id: 2,
            title: "Rent",
            amount: 300,
            type: "expense",
            category: "Rent",
            date: "2025-02-01",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (tx) => {
    setTransactions((prev) => [tx, ...prev]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);