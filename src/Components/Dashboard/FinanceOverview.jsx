import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const FinanceOverview = ({ transactions }) => {
  // ✅ Calculate values
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  // ✅ Chart data (clean & meaningful)
  const data = [
    { name: "Income", amount: totalIncome },
    { name: "Expense", amount: totalExpense },
  ];
  return (
    <>
      <section className="card bg-gradient-to-b from-[#2A0150] to-[#090025] border-violet-100 p-6 rounded-2xl shadow-md  border  mx-4">
        <div className="flex items-center justify-between">
          <h5 className="text-lg">Financial Overview</h5>
        </div>

        <CustomPieChart
          data={data}
          colors={["#7c3aed", "#ef4444"]}
          label="Total Balance"
          totalAmount={`₹${totalBalance}`}
          showTextAnchor
        />
      </section>
    </>
  );
};

export default FinanceOverview;
