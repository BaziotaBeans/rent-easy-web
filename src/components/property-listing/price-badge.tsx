import { formatPriceToKwanza } from "@/utils/format-price";

interface PriceBadgeProps {
    price: number
    type: string | null
}
export function PriceBadge({ price, type }:PriceBadgeProps) {
    const isPropertyRent = type === "Arrendamento";

    return (    
        <div className="inline-flex items-end rounded-xl text-primary-base text-lg font-bold gap-2 bg-primary-base/10 px-4 py-1">
            {formatPriceToKwanza(price)} {isPropertyRent && <span className="text-zinc-600 font-medium text-xs">por mês</span>}
        </div>
    );
}