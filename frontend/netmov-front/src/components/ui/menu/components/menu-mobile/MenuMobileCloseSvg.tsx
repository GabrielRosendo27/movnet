import { MenuMobileSvgProps } from "../../types/types";

export function MenuMobileCloseSvg({ toggleMenu, menuOpen }: MenuMobileSvgProps) {
  return (
    <div className="cursor-pointer p-4 relative left-[175px] top-[20px]" onClick={toggleMenu}>
      <img src="close.svg" alt="close" className={`absolute inset-0 h-6 w-6 transition-opacity duration-150 ease-in-out ${menuOpen ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}
