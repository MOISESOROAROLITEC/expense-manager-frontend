import { parse, format } from "date-fns";

export function formatDate(date: string) {
  const initialDate = parse(
    date,
    "EEE, dd MMM yyyy HH:mm:ss 'GMT'",
    new Date()
  );

  const localDate = initialDate;

  return format(localDate, "yyyy-MM-dd'T'HH:mm:ss'Z'");
}
