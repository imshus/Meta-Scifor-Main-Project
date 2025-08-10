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
        <span className="text-white font-bold text-xl cursor-pointer">
           <img className='w-10 h-10 rounded-3xl' src="data:image/jpeg;base64,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" alt="navlogo" />
        </span>
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
