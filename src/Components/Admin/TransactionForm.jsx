import { useState } from "react";
import IconPicker from "./IconPicker";
import toast from "react-hot-toast";

const TransactionForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "income",
    category: "",
    date: "",
    icon: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.amount || !formData.date) return;

    onAdd({
      ...formData,
      amount: Number(formData.amount),
      id: Date.now(),
    });

    toast.success("Transaction Added Successfully");

    // reset
    setFormData({
      title: "",
      amount: "",
      type: "income",
      category: "",
      date: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#13131a] border border-[#26263a] rounded-xl p-6 space-y-4"
    >
      <h3 className="text-lg font-semibold text-white">Add Transaction</h3>
      <IconPicker
        icon={formData.icon}
        onSelect={(selectedIcon) =>
          setFormData({ ...formData, icon: selectedIcon })
        }
      />
      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Title (e.g. Salary, Rent)"
        value={formData.title}
        onChange={handleChange}
        className="w-full bg-[#1a1a24] text-white border border-[#26263a] rounded-md px-3 py-2 outline-none focus:border-[#7c3aed]"
      />

      {/* Amount */}
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        className="w-full bg-[#1a1a24] text-white border border-[#26263a] rounded-md px-3 py-2 outline-none focus:border-[#7c3aed]"
      />

      {/* Type */}
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="w-full bg-[#1a1a24] text-white border border-[#26263a] rounded-md px-3 py-2 outline-none focus:border-[#7c3aed]"
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* Category */}
      <input
        type="text"
        name="category"
        placeholder="Category (Food, Rent, etc.)"
        value={formData.category}
        onChange={handleChange}
        className="w-full bg-[#1a1a24] text-white border border-[#26263a] rounded-md px-3 py-2 outline-none focus:border-[#7c3aed]"
      />

      {/* Date */}
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full bg-[#1a1a24] text-white border border-[#26263a] rounded-md px-3 py-2 outline-none focus:border-[#7c3aed]"
      />

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#7c3aed] to-[#9333ea] hover:opacity-90 text-white py-2 rounded-md transition"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
