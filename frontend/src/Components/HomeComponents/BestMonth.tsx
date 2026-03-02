import { Crown, Handshake, Rocket } from "lucide-react";
import { useListTaskContext } from "@/context/ListTaskContext";
import { getMonthName } from "@/utils/HelpFun";
import { useEffect, useMemo } from "react";


function BestMonth(){
  const { taskDashboardData } = useListTaskContext();
  const monthlyCount = taskDashboardData.monthlyTaskData;

  function bestMonth() {
    if (monthlyCount.length > 0) {
      const sortedMonths = [...monthlyCount].sort((a, b) => {
        return b.count - a.count;
      });

      const month = getMonthName(sortedMonths[0].month);
      const bestMonthCounter = sortedMonths[0].count

      return { 
        bestMonthCounter, 
        month 
      };
    }

    return {
      bestMonthCounter: 0,
      month: "",
    };
  }

  const bestMonthValue = useMemo(() => {
    return bestMonth();
  }, [monthlyCount]);

  const { bestMonthCounter, month } = bestMonthValue;

  return (
    <div className="h-full flex flex-col gap-4 items-center justify-center chartDiv text-3xl text-center divBorderHover">
      <p>Best Month:</p>
      <div className="flex gap-2 items-center">
        <p className="font-extrabold text-purple-800 text-4xl">{month}</p>
        <Crown className="mt-1 text-yellow-400" />
      </div>
      <p>Number of completed tasks:</p>
      <div className="flex gap-2 items-center">
        <p className="font-extrabold text-purple-800 text-4xl">{bestMonthCounter}</p>
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