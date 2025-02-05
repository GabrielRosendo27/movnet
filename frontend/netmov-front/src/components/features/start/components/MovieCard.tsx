import { MovieCardProps } from "../types/types";

export function MovieCard({ title, year, overview }: MovieCardProps) {
  return (
    <div className="group relative flex h-64 w-full transform cursor-pointer overflow-hidden rounded-xl bg-gray-800 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      {/* Poster com overlay gradient */}
      {/* <div className="relative h-full w-48 shrink-0">
        <img src={posterUrl || "/placeholder-movie.jpg"} alt={`Poster de ${title}`} className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800/80 via-gray-800/30 to-transparent" />
      </div> */}

      {/* Conteúdo do card */}
      <div className="flex flex-1 flex-col p-6">
        {/* Título */}
        <h3 className="mb-2 text-2xl font-bold text-white line-clamp-2">{title}</h3>

        {/* Metadados */}
        <div className="mt-auto flex items-center gap-4 text-gray-300">
          {/* Ano */}
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-myOrange" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">{year}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-medium">{overview}/10</span>
          </div>
        </div>

        {/* Efeito hover */}
        <div className="absolute bottom-0 left-0 right-0 top-0 hidden bg-gradient-to-t from-myPurple/20 via-transparent to-transparent group-hover:block" />
      </div>
    </div>
  );
}
