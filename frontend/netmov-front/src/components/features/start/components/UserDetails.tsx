import { DisplayTotal } from "./DisplayTotal";
import { TotalHoursDisplay } from "./TotalHoursDisplay";

export function UserDetails() {
  return (
    <>
      <div className="mt-36 border border-slate-900 rounded-lg p-6">
        <div className="flex gap-10 text-gray-300 text-3xl max-md:text-2xl">
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
