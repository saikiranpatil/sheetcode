import Navbar from "./shared/components/Navbar"
import { Route, Routes } from "react-router"
import { navItems } from "./shared/constants"

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Navbar />
      <div className="mx-auto max-w-3xl">
        <Routes>
          {
            navItems.map(navItem =>
              <Route path={navItem.url} element={<navItem.element />} />
            )
          }
        </Routes>
      </div>

    </div>
  )
}

export default App
