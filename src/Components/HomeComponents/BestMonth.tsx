import { Crown, Handshake, Rocket } from "lucide-react";


function BestMonth(){
    return (
        <div className="h-full flex flex-col gap-4 items-center justify-center chartDiv text-3xl text-center divBorderHover">
            <p>Best Month:</p>
            <div className="flex gap-2 items-center">
                <p className="font-extrabold text-purple-800 text-4xl">January</p>
                <Crown className="mt-1 text-yellow-400"/>
            </div>
            <p>Number of completed tasks:</p>
            <div className="flex gap-2 items-center">
                <p className="font-extrabold text-purple-800 text-4xl">45</p>
                <Rocket className="mt-1 text-yellow-400"/>
            </div>
            <div className="flex gap-2 items-center">
                <p>Congrats </p>
                <Handshake className="mt-2 text-yellow-400"/>
            </div>
            
        </div>
    )
}

export default BestMonth;