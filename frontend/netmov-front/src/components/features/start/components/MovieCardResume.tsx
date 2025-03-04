import { MovieCardResumeProps } from "../types/types";

export function MovieCardResume({ title, year, id, onRemove, isRemoving, filePath }: MovieCardResumeProps) {
  return (
    <div className="flex w-[calc(100vw-36rem)]">
      <img src={filePath} className="w-20 object-cover rounded-sm" alt="poster" />
      <div className="flex gap-2 ml-4">
        <span className="text-myOrange text-xl">{id}.</span>
        <div className="flex flex-col">
          <span className="text-lg">{title}</span>
          <div className="mt-2">
            <span> {year}</span>
          </div>
        </div>
      </div>
      <div className="ml-2">
        <span className="text-xl text-myPurple">|</span>
        <button onClick={onRemove} disabled={isRemoving} className=" hover:opacity-50 transition-opacity duration-200 p-2">
          <img src="trash.svg" className="w-4 flex-shrink-0" alt="trash" />
        </button>
      </div>
    </div>
  );
}
