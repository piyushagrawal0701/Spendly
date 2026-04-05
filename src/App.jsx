import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Expense from './Pages/Expense'
import Income from './Pages/Income'
import Admin from './Pages/Admin'
import Footer from './Components/Footer'
import ScrollToTop from './Components/ScrollToTop'
import { Toaster } from 'react-hot-toast'

function App() {


  return (
    <>
      <Navbar/>
      <Toaster/>
       <div className="px-2 md:px-16 lg:px-24 xl:px-28 grow bg-gradient-to-b from-black to-[#3B006E] text-white min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin  />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/income" element={<Income />} />
            
          </Routes>
          <ScrollToTop/>
        <Footer/>
        </div>
    </>
  )
}

export default App
