import { useFormatRuntime } from "../hooks/useFormatRuntime";
import { MovieProps } from "../types/types";

export function MovieCardResume({ title, year, id, onRemove, isRemoving, filePath, imdbRating, rottenRating, runtime, genre }: MovieProps) {
  const formattedRuntime = useFormatRuntime(runtime);
  return (
    <div className="flex w-[calc(100vw-36rem)] max-lg:w-full">
      <img src={filePath} className="w-20 object-cover rounded-sm max-md:w-[100px]" alt="poster" />
      <div className="flex gap-2 ml-4 max-sm:ml-0">
        <span className="text-slate-400 text-xl ml-4">{id}.</span>
        <div className="flex flex-col">
          <span className="text-lg">{title}</span>
          <div className="flex items-center">
            <span className="text-xl text-myOrange mr-2">|</span>
            <span className="max-md:mt-2">{year}</span>
          </div>
          <div className="flex items-center">
            <span className="text-xl text-myOrange mr-2">|</span>
            <div>{runtime ? <span className="">{formattedRuntime}</span> : "-"}</div>
          </div>
          <div className="flex items-center">
            <span className="text-myPurple text-xl mr-2">|</span>
            {genre && genre.length > 0 ? (
              <>
                <span className="">{genre[0]}</span>
              </>
            ) : (
              "Não Encontrado"
            )}
          </div>
          <div className="flex gap-1 items-center max-md:flex-col max-md:items-start">
            <div className="flex items-center">
              <span className="text-xl text-myPurple mr-1">|</span>
              <img src="star.svg" className="w-5" />
              <span className="mr-1">{imdbRating ? imdbRating.toFixed(1) : "--%"}</span>

              <img src="tomato.svg" className="ml-1 w-6" />
              <span>{rottenRating ? `${rottenRating}%` : "-.-"}</span>
            </div>
            <div className="flex items-center">
              <span className="text-xl text-myPurple">|</span>
              <button onClick={onRemove} disabled={isRemoving} className=" hover:opacity-50 transition-opacity duration-200 p-2">
                <img src="trash.svg" className="w-4 flex-shrink-0" alt="trash" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
