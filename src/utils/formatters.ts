export function formatDate(dateString?: string) {
  if (dateString == null) return;

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return;

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formattedDate;
}
