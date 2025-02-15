import { Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ContractStatus } from "./contract-status";
import { ContractDetailSheet } from "./contract-detail-sheet";
import { ContractResponse } from "@/types/contract";
import { formatDate } from "@/utils/date-formats";
import { checkIfValidContract } from "@/utils";
import { motion } from "framer-motion";

interface ContractCardProps {
  data: ContractResponse;
  index: number;
}

export function ContractCard({ data, index }: ContractCardProps) {
  const contractStatus = checkIfValidContract(
    data.property.fkPropertyTypeEntity.designation,
    data.endDate
  )
    ? "active"
    : "inactive";

  return (
    <ContractDetailSheet dataContract={data}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        // whileHover={{ scale: 1.02 }}
      >
        <Card className="bg-zinc-50 relative flex lg:flex-row flex-col lg:items-center gap-6 py-6 px-4 shadow-none transition-all cursor-pointer hover:bg-zinc-50 hover:border-primary-base hover:bg-primary-base/5">
          <ContractStatus type={contractStatus} />
          <svg
            width="64"
            height="64"
            viewBox="0 0 28 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20"
          >
            <path
              opacity="0.5"
              d="M1.25 12.1667C1.25 6.82446 1.25 4.15262 2.91033 2.49371C4.57067 0.834791 7.24108 0.833374 12.5833 0.833374H15.4167C20.7589 0.833374 23.4307 0.833374 25.0897 2.49371C26.7486 4.15404 26.75 6.82446 26.75 12.1667V17.8334C26.75 23.1756 26.75 25.8475 25.0897 27.5064C23.4293 29.1653 20.7589 29.1667 15.4167 29.1667H12.5833C7.24108 29.1667 4.56925 29.1667 2.91033 27.5064C1.25142 25.846 1.25 23.1756 1.25 17.8334V12.1667Z"
              stroke="#4A5568"
              strokeWidth="1.5"
            />
            <path
              d="M8.3335 12.1667H19.6668M8.3335 17.8334H15.4168"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          <div className="flex flex-col gap-2 w-full">
            <div>
              <h3 className="text-zinc-400 font-semibold text-lg">
                Contrato #{index}
              </h3>
              <span className="text-zinc-600 text-base font-medium">
                {data.property.title}
              </span>
            </div>
            <div className="flex lg:items-center lg:flex-row flex-col justify-between w-full lg:gap-0 gap-2">
              <div className="flex sm:items-center sm:gap-4 gap-2 sm:flex-row flex-col">
                <span className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
                  <Calendar className="w-4 h-4" /> Data de início:{" "}
                  {formatDate(data.startDate)}
                </span>

                {data.endDate && (
                  <span className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
                    <Calendar className="w-4 h-4" /> Data de término:{" "}
                    {formatDate(data.endDate)}
                  </span>
                )}
              </div>

              {!data.signaturePropertyCustomer && (
                <motion.span
                  className="text-sm text-orange-600 font-semibold bg-orange-200 rounded-2xl px-3 py-1 self-start"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0.8, 1, 0.8],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  Precisa assinar o contrato
                </motion.span>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    </ContractDetailSheet>
  );
}
