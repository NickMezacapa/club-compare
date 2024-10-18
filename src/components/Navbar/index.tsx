import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#2e2e2e] text-[#FFFFFF] px-4 py-2 flex justify-between items-center w-full shadow-md border-b border-[hsla(0, 0%, 59.2%, 0.3)]">
      {/* Logo on the left */}
      <section className="text-2xl font-bold flex items-center justify-center">
        <Link href="/" className="flex items-center justify-center gap-4">
          <Image alt="Logo" width={50} height={50} src="/DOGLEG-w.png" />
          <p>DOGLEG GOLF</p>
        </Link>
      </section>

{/* Hamburger menu on the right */}
<div className="lg:hidden ml-auto flex items-center justify-end">
        <button onClick={toggleMenu} className="focus:outline-none">
          {/* Hamburger icon */}
          <svg
            className={`w-6 h-6 transition-transform duration-300 ease-in-out transform ${isOpen ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="transition-all duration-300 ease-in-out"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isOpen
                  ? 'M6 18L18 6M6 6l12 12' // 'X' shape
                  : 'M4 6h16M4 12h16m-7 6h7' // Hamburger shape
              }
            />
          </svg>
        </button>
      </div>

      {/* Links */}
{/*       <div
        className={`lg:flex ${isOpen ? 'block' : 'hidden'} flex-col sm:flex-row absolute sm:relative top-12 right-0 bg-[#2e2e2e] sm:bg-transparent w-full sm:w-auto z-10 lg:flex ml-auto`}
      >
        <Link href="https://google.com">
          <p className="block px-4 py-2 text-sm">Link 1</p>
        </Link>
        <Link href="https://google.com">
          <p className="block px-4 py-2 text-sm">Link 2</p>
        </Link>
        <Link href="https://google.com">
          <p className="block px-4 py-2 text-sm">Link 3</p>
        </Link>
        <Link href="https://google.com">
          <p className="block px-4 py-2 text-sm">Link 4</p>
        </Link>
        <Link href="https://google.com">
          <p className="block px-4 py-2 text-sm">Link 5</p>
        </Link>
      </div> */}
    </nav>
  );
};

export default Navbar;
