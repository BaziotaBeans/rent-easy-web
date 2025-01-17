import { Mail, Phone, Copy, Info } from "lucide-react";
import { FaCircleCheck } from "react-icons/fa6";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { PropertyResponse } from "@/types/property";


interface PropertyAgentBoxProps {
  data: PropertyResponse;
}
export function PropertyAgentBox({ data }:PropertyAgentBoxProps) {
  return (
    <Card className="flex flex-col gap-2 shadow-none">
      <div className="flex items-center gap-4 p-4">
        <UserBox />
        <div className="flex flex-col">
          <span className="font-bold text-zinc-700 text-base">
            Agente imobiliária
          </span>
          <span className="text-base text-zinc-700">{data.property.companyEntity.user.fullName}</span>
          <span className="text-green-700 flex items-center gap-2 text-base">
            Verificado <Info className="w-5 h-5" strokeWidth={1.5}/>
          </span>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col gap-4 p-4">
        <span className="text-base text-zinc-700 flex items-center gap-4">
          <Mail className="w-6 h-6" />
          {data.property.companyEntity.user.email}
        </span>
        <span className="text-base text-zinc-700 flex items-center gap-4">
          <Phone className="w-6 h-6" />
          {data.property.companyEntity.user.phone}
        </span>
      </div>
    </Card>
  );
}

function UserBox() {
  return (
    <div className="bg-zinc-100 w-[60px] h-[60px] flex justify-center items-center rounded-full relative">
      <svg
        width="21"
        height="24"
        viewBox="0 0 21 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5 13.3333C13.2953 13.3333 15.8375 14.143 17.7077 15.284C18.641 15.8533 19.439 16.5253 20.0153 17.2557C20.5823 17.9732 21 18.8318 21 19.75C21 20.7358 20.5205 21.5128 19.8298 22.067C19.1765 22.592 18.3143 22.9397 17.3985 23.1823C15.5575 23.6688 13.1005 23.8333 10.5 23.8333C7.8995 23.8333 5.4425 23.67 3.6015 23.1823C2.68567 22.9397 1.8235 22.592 1.17017 22.067C0.478333 21.5117 0 20.7358 0 19.75C0 18.8318 0.417667 17.9732 0.984667 17.2545C1.561 16.5253 2.35783 15.8545 3.29233 15.2828C5.1625 14.1442 7.70583 13.3333 10.5 13.3333ZM10.5 0.5C12.0471 0.5 13.5308 1.11458 14.6248 2.20854C15.7188 3.30251 16.3333 4.78624 16.3333 6.33333C16.3333 7.88043 15.7188 9.36416 14.6248 10.4581C13.5308 11.5521 12.0471 12.1667 10.5 12.1667C8.9529 12.1667 7.46917 11.5521 6.37521 10.4581C5.28125 9.36416 4.66667 7.88043 4.66667 6.33333C4.66667 4.78624 5.28125 3.30251 6.37521 2.20854C7.46917 1.11458 8.9529 0.5 10.5 0.5Z"
          fill="#A7A6AB"
        />
      </svg>

      <FaCircleCheck className="fill-green-700 absolute bottom-1 -right-1"/>
    </div>
  );
}
