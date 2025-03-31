import CountUp from "react-countup";
import { TotalHours } from "../api/totalHours";

export function TotalHoursDisplay() {
  const { data: totalHours, isLoading, error, isFetching } = TotalHours();

  return (
    <div className="flex flex-col">
      {isLoading && <div>Carregando...</div>}
      {error && <div>Erro ao carregar dados</div>}
      <span>Horas assistidas </span>
      <CountUp
        end={totalHours ?? 0}
        duration={2.5}
        separator=","
        decimals={0}
        className="mx-auto text-6xl text-myPurple max-md:text-3xl max-md:mx-0"
        startOnMount={false}
        useEasing={true}
        easingFn={(t, b, c, d) => c * ((t = t / d - 1) * t * t + 1) + b}
        delay={0.3}
      />
      {isFetching && <span className="text-sm">↻</span>}
    </div>
  );
}
