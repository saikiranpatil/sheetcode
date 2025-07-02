import Navbar from "@/entrypoints/home/components/Navbar";
import { navItems } from "@/shared/constants";
import { Route, Routes } from "react-router";

const Home = () => {
  <div className="w-full min-h-screen bg-gray-100">
    <Navbar />
    <div className="mx-auto max-w-3xl">
      <Routes>
        {navItems.map(navItem =>
          <Route path={navItem.url} element={<navItem.element />} />
        )}
      </Routes>
    </div>
  </div>
}

export default Home
