import toast from "react-hot-toast";
import { useTransactions } from "../../Context/TransactionContext";

const ClearAllButton = () => {
  const { clearTransactions } = useTransactions();

  const handleClear = () => {
    if (window.confirm("Delete all transactions? This cannot be undone.")) {
      clearTransactions();

      toast("All transactions cleared 🗑️", {
        icon: "🔥",
        style: {
          background: "#1a1a24",
          color: "#fff",
          border: "1px solid #26263a",
        },
      });
    }
  };

  return (
    <button
      onClick={handleClear}
      className="bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white px-4 py-2 rounded-md text-sm transition"
    >
      Clear All Data
    </button>
  );
};

export default ClearAllButton;