import { parseISO, addDays, format } from "date-fns";

export function formatTime(createdAt: string | null | undefined): string {
  if (!createdAt) {
    return "---";
  }

  try {
    const parsedDate = parseISO(createdAt);
    return format(addDays(parsedDate, 1), "HH:mm");
  } catch (error) {
    return "---";
  }
}
