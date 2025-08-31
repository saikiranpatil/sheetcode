import Logo from "@/components/shared/Logo";
import Hero from "@/entrypoints/popup/Hero";

function App() {
  return (
    <div className="w-72 bg-gray-100 transition-colors duration-300">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl md:max-w-[80vw] mx-auto">
          <div className="px-4 py-2 flex items-center justify-center gap-2">
            <Logo />
          </div>
        </div>
      </div>
      <Hero />
    </div>
  )
}

export default App