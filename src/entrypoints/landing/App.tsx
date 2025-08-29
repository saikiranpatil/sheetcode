import { Route, Routes } from "react-router";

import Navbar from "@/components/layout/Navbar";
import Home from "@/entrypoints/landing/pages/Home";
import Sheets from "@/entrypoints/landing/pages/Sheets";
import Submissions from "@/entrypoints/landing/pages/Submissions";
import SheetsDetails from "@/entrypoints/landing/pages/Sheets/SheetsDetails";

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-100 transition-colors duration-300">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl md:max-w-[80vw] mx-auto">
          <Navbar />
        </div>
      </div>
      <div className="mx-auto max-w-3xl md:max-w-[80vw] ">
        <Routes>
          <Route index element={<Home />} />
          <Route path="submissions" element={<Submissions />} />
          <Route path="sheets" >
            <Route index element={<Sheets />} />
            <Route path=":id" element={<SheetsDetails />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App