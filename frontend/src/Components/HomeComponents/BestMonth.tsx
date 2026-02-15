import { Crown, Handshake, Rocket } from "lucide-react";
import { useListTaskContext } from "@/context/ListTaskContext";
import { getMonthName } from "@/utils/HelpFun";
import { useEffect, useMemo } from "react";


function BestMonth(){
  const { monthlyCount } = useListTaskContext();

  function bestMonth() {
    if (Object.keys(monthlyCount).length > 0) {
      const sortedValues = Object.entries(monthlyCount).sort(
        ([, a], [, b]) => b - a,
      );
      const monthNum: string[] = sortedValues[0].toString().split("-");
      const monthTaskNumber: string = sortedValues[0].toString().split(",")[1];
      const month: string = getMonthName(parseInt(monthNum[0]));

      return { monthTaskNumber, month };
    }

    return {
      monthTaskNumber: "",
      month: "",
    };
  }

  const bestMonthValue = useMemo(() => {
    return bestMonth();
  }, [monthlyCount]);

  const { monthTaskNumber, month } = bestMonthValue;

  return (
    <div className="h-full flex flex-col gap-4 items-center justify-center chartDiv text-3xl text-center divBorderHover">
      <p>Best Month:</p>
      <div className="flex gap-2 items-center">
        <p className="font-extrabold text-purple-800 text-4xl">{month}</p>
        <Crown className="mt-1 text-yellow-400" />
      </div>
      <p>Number of completed tasks:</p>
      <div className="flex gap-2 items-center">
        <p className="font-extrabold text-purple-800 text-4xl">{monthTaskNumber}</p>
        <Rocket className="mt-1 text-yellow-400" />
      </div>
      <div className="flex gap-2 items-center">
        <p>Congrats </p>
        <Handshake className="mt-2 text-yellow-400" />
      </div>
    </div>
  );
}

export default BestMonth;