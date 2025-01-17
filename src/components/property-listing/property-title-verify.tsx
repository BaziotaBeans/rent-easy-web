import { FaCircleCheck } from "react-icons/fa6";

interface PropertyTitleVerifyProps {
  title: string;
}

export function PropertyTitleVerify({ title }: PropertyTitleVerifyProps) {
  return (
    <div className="flex items-center gap-2">
      <h1 className="text-3xl font-bold text-zinc-600">{title}</h1>

      <FaCircleCheck className="w-5 h-5 fill-green-700"/>
    </div>
  );
}
