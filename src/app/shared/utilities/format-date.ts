import { parse, format } from "date-fns";

export function formatDate(date: string) {
  const initialDate = parse(
    date,
    "EEE, dd MMM yyyy HH:mm:ss 'GMT'",
    new Date()
  );

  return format(initialDate, "yyyy-MM-dd'T'HH:mm:ss'Z'");
}
