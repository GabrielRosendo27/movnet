import { MenuMobileSvgProps } from "../../types/types";

export function MenuMobileSvg({ toggleMenu, menuOpen }: MenuMobileSvgProps) {
  return (
    <div className="hidden max-xl:flex ml-6 pt-1 relative w-6 h-6">
      <button onClick={toggleMenu} className="text-gray-500 focus:outline-none w-full h-full relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`absolute inset-0 h-6 w-6 transition-opacity duration-150 ease-in-out ${menuOpen ? "opacity-0" : "opacity-100"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  );
}
