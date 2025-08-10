import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
const Navbar: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const isMobile = windowWidth < 768; 
  interface NavLink {
    label: string;
    href: string;
  }
  const navLinks: NavLink[] = [
    { label: "Home", href: "#" },
    { label: "Services", href: "#" },
  ];
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isDrawerOpen && e.target instanceof Element) {
        const drawer = document.querySelector('.drawer');
        if (drawer && !drawer.contains(e.target)) {
          setIsDrawerOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDrawerOpen]);
  return (
    <>
      <nav className="flex items-center justify-between sticky top-0 bg-cyan-600 h-16 w-full px-6 z-50 shadow-lg">
        <span className="text-white font-bold text-xl cursor-pointer">NavLogo</span>
        {isMobile ? (
          <button 
            onClick={toggleDrawer}
            className="text-white p-2 rounded-md hover:bg-cyan-700 transition-colors"
            aria-label="Toggle menu"
          >
            <FiMenu className="text-2xl" />
          </button>
        ) : (
          <div className="flex flex-row gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className="flex justify-center items-center text-white font-semibold hover:bg-cyan-700 px-4 py-2 rounded transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>
      {isMobile && (
        <div 
          className={`fixed inset-0 z-40 transition-opacity duration-300 ${
            isDrawerOpen ? 'opacity-100 top-16' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={toggleDrawer}
          />
          <div 
            className={`drawer absolute top-0 left-0 h-full w-64 bg-cyan-600 shadow-xl transform transition-transform duration-300 ${
              isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex justify-between items-center p-6 border-b border-cyan-700">
              <span className="text-white font-bold text-xl">Menu</span>
              <button 
                onClick={toggleDrawer}
                className="text-white p-1 rounded-full hover:bg-cyan-700 transition-colors"
                aria-label="Close menu"
              >
                <FiX className="text-2xl" />
              </button>
            </div>
            <div className="flex flex-col py-4">
              {navLinks.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  className="flex items-center text-white font-medium hover:bg-cyan-700 px-6 py-4 transition-colors"
                  onClick={toggleDrawer}
                >
                  {link.label}
                </a>
              ))}
              </div>
            </div>
          </div>
      )}
    </>
  );
};
export default Navbar;