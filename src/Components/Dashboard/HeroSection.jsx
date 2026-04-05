import { useTransactions } from "../../Context/TransactionContext";

export default function HeroSection() {
  const { transactions } = useTransactions();

  // ✅ Download Function
const escapeCSV = (value) => `"${String(value).replace(/"/g, '""')}"`;

const handleDownload = () => {
  const headers = ["Title", "Amount", "Type", "Category", "Date"];

  const rows = transactions.map((t) => [
    escapeCSV(t.title),
    t.amount,
    t.type,
    escapeCSV(t.category),
    t.date,
  ]);

  const csvContent =
    [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "transactions.csv";
  link.click();

  URL.revokeObjectURL(url);
};

  return (
    <div className="max-w-5xl py-16 md:pl-24 mx-2 md:mx-auto flex flex-col items-start justify-center text-left bg-gradient-to-b from-[#2A0150] to-[#090025] rounded-2xl p-10 text-white border border-[#26263a]">
      
      {/* Top Badge */}
      <div className="flex items-center">
        
        <div>
          <p className="text-sm text-gray-400">
            Smart Finance Tracking
          </p>
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-[46px] md:leading-[60px] font-semibold max-w-xl mt-3 bg-gradient-to-r from-white to-[#b26ee3] text-transparent bg-clip-text">
        Track. Analyze. Control Your Money
      </h1>

      {/* Subtext */}
      <p className="text-gray-400 mt-3 max-w-md text-sm">
        Manage your income, expenses, and balance with powerful insights and clean visualizations.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mt-8 flex-wrap">
        
        {/* Primary */}
        <button className="px-10 py-2.5 text-white bg-gradient-to-r from-[#7c3aed] to-[#9333ea] hover:opacity-90 transition-all rounded-full text-sm">
          Get Started
        </button>

        {/* Download */}
        <button
          onClick={handleDownload}
          className="px-10 py-2.5 border border-[#26263a] text-gray-300 hover:text-white hover:bg-[#1a1a24] transition-all rounded-full text-sm"
        >
          Download Data
        </button>
      </div>
    </div>
  );
}