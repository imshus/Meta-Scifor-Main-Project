function Navbar() {
  return (
    <nav className="flex items-center justify-between sticky top-0 bg-cyan-600 h-12 w-full px-6">
  <span className="text-white font-bold text-xl cursor-pointer">Logo</span>
  <div className="flex space-x-4">
    <a href="#" className="flex justify-center items-center text-white font-semibold hover:bg-cyan-700 px-4 py-1 rounded">
      Link1
    </a>
    <a href="#" className="flex justify-center items-center text-white font-semibold hover:bg-cyan-700 px-4 py-1 rounded">
      Link2
    </a>
  </div>
</nav>
  )
}
export default Navbar