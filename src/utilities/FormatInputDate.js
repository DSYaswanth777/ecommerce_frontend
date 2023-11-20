export const formatDateForInput = (isoDate) => {
  const date = new Date(isoDate);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return formattedDate;
};
