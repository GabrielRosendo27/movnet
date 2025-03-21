import { useActionNavigation } from "../../../hooks/useActionNavigation";
import { Button } from "../../ui/buttons/Button";
import { Menu } from "../../ui/menu/components/Menu";

import { Description } from "./components/Description";
import { PopularMovies } from "./components/PopularMovies";
import { TopRatedMovies } from "./components/TopRatedMovies";
export function Home() {
  const { handleActionNavigation } = useActionNavigation();

  return (
    <div className="bg-myGray w-screen h-screen overflow-x-hidden ">
      <Menu />
      <div className="container mx-auto p-4 mt-48">
        <div className="flex gap-10">
          <div className="flex items-center flex-col h-max">
            <Description />
            <Button
              onClick={() => handleActionNavigation("register")}
              text="Começar"
              className="bg-myPurple text-xl text-white px-8 py-4 hover:bg-indigo-800 mb-8 mt-8 animate-fadeSlideDown"
            />
            <div className="hidden max-md:grid ">
              <PopularMovies />
            </div>
            <TopRatedMovies />
          </div>
          <div className="max-md:hidden">
            <PopularMovies />
          </div>
        </div>
      </div>
    </div>
  );
}
