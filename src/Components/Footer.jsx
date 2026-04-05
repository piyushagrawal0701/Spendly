import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-16 bg-gradient-to-t from-black to-[#1a002e] border-t border-[#26263a] text-gray-300 px-6 md:px-16 py-10 rounded-t-2xl">
      
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-10" />
            <h1 className="text-xl font-semibold text-white">Spendly</h1>
          </Link>

          <p className="text-sm text-gray-400 max-w-sm">
            Track your income, control expenses, and gain insights into your financial habits — all in one place.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-sm font-medium text-white mb-4">Navigation</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">Dashboard</Link>
            </li>
            <li>
              <Link to="/income" className="hover:text-white transition">Income</Link>
            </li>
            <li>
              <Link to="/expense" className="hover:text-white transition">Expense</Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-white transition">Add Transaction</Link>
            </li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <h3 className="text-sm font-medium text-white mb-4">About</h3>
          <ul className="space-y-3 text-sm">
            <li className="text-gray-400">Personal Finance Tracker</li>
            <li className="text-gray-400">Built for simplicity</li>
            <li className="text-gray-400">No backend required</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 pt-6 border-t border-[#26263a] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
        <p>© 2026 Spendly. Made with ❤ by Piyush</p>
        <p>All rights reserved.</p>
      </div>

      {/* Background Glow Text */}
      <div className="relative mt-10">
        <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-3xl h-40 bg-purple-700 rounded-full blur-[120px] text-transparent " />
        <h1 className="text-center font-extrabold text-transparent text-[clamp(3rem,10vw,8rem)] opacity-30 [-webkit-text-stroke:1px_#fff] bg-clip-text">
          Spendly
        </h1>
      </div>

    </footer>
  );
};

export default Footer;