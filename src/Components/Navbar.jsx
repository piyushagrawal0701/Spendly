import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

import {
  LuLayoutDashboard,
  LuHandCoins,
  LuWalletMinimal,
  LuContact,
} from "react-icons/lu";
const Navbar = () => {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <section className="flex flex-col items-center bg-black text-white">
        <nav className="flex items-center justify-between py-3 md:px-16 lg:px-24 xl:px-32 px-6 md:py-4 w-full">
          <Link to="/" className="flex gap-2">
            <img src={logo} alt="logo" className="w-10" />
            <h1 className="text-xl sm:text-2xl font-medium ">Spendly</h1>
          </Link>
          <div
            id="menu"
            className={`${mobileOpen ? "max-md:w-full" : "max-md:w-0"} max-md:absolute max-md:top-0 max-md:z-10 max-md:left-0 max-md:transition-all max-md:duration-300 max-md:overflow-hidden max-md:h-full max-md:bg-black/50 max-md:backdrop-blur max-md:flex-col max-md:justify-center flex items-center gap-8 text-sm`}
          >
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="flex gap-1 items-center text-gray-200 hover:text-gray-300"
            >
              <LuLayoutDashboard />
              Dashboard
            </Link>
            <Link
              to="/income"
              onClick={() => setMobileOpen(false)}
              className="flex gap-1 items-center text-gray-200 hover:text-gray-300"
            >
              <LuWalletMinimal />
              Income
            </Link>
            <Link
              to="/expense"
              onClick={() => setMobileOpen(false)}
              className="flex gap-1 items-center text-gray-200 hover:text-gray-300"
            >
              <LuHandCoins />
              Expense
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className=" flex gap-1 items-center text-gray-200 hover:text-gray-300"
            >
              <LuContact />
              Contact
            </Link>

           <button
  onClick={() => navigate("/admin")}
  className="md:hidden bg-gradient-to-r from-[#7c3aed] to-[#9333ea] 
  text-white px-6 h-10 rounded-full text-sm transition"
>
  Admin Panel
</button>
            <button
              id="close-menu"
              onClick={() => setMobileOpen(false)}
              className="md:hidden bg-gray-900 hover:bg-gray-800 text-white p-2 rounded-md aspect-square font-medium transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <div className="relative hidden md:block">
            <select
              onChange={(e) => navigate(e.target.value)}
              className="appearance-none bg-gradient-to-r from-[#7c3aed] to-[#9333ea] 
    text-white text-sm px-5 pr-10 h-10 rounded-full cursor-pointer 
    outline-none border border-transparent hover:opacity-90 transition"
            >
              <option value="/" className="text-black">
                Viewer
              </option>
              <option value="/admin" className="text-black">
                Admin
              </option>
            </select>

            {/* Custom Arrow */}
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white">
              ▼
            </div>
          </div>

          <button
            id="open-menu"
            onClick={() => setMobileOpen(true)}
            className="md:hidden bg-gray-900 hover:bg-gray-800 text-white p-2 rounded-md aspect-square font-medium transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M4 12h16" />
              <path d="M4 18h16" />
              <path d="M4 6h16" />
            </svg>
          </button>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
