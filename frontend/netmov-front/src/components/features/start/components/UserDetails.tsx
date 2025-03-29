import { DisplayTotal } from "./DisplayTotal";
import { TotalHoursDisplay } from "./TotalHoursDisplay";

export function UserDetails() {
  return (
    <>
      <div className="mt-48 flex flex-col p-4 items-start justify-center border border-slate-900 rounded-lg w-max ml-10 h-24">
        <div className="flex gap-10 text-gray-300 text-xl">
          <DisplayTotal />
          <TotalHoursDisplay />
        </div>

        {/* <span>Gêneros preferidos:</span>
        <span>Atividade mensal ou semanal:</span>
        <span>Últimas atividades (Adição e Remoção):</span> */}
      </div>
    </>
  );
}
