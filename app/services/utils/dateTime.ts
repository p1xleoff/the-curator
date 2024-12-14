import { Timestamp } from "@react-native-firebase/firestore";

export const formatReviewDate = (date: Timestamp | Date): string => {
  // If the date is a Firestore Timestamp, convert it to a Date object
  const dateObject = date instanceof Timestamp ? date.toDate() : new Date(date);

  // Ensure the date is valid
  if (isNaN(dateObject.getTime())) {
    return "Invalid Date"; // Return a default string if the date is invalid
  }

  return dateObject.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

//get date for API requests
export const getDateRanges = () => {
  const getCurrentDate = () => new Date().toISOString().split("T")[0];
  const getLastYearDate = () => {
    const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    return lastYear.toISOString().split("T")[0];
  };
  const getNextYearDate = () => {
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    return nextYear.toISOString().split("T")[0];
  };

  return {
    currentDate: getCurrentDate(),
    lastYearDate: getLastYearDate(),
    nextYearDate: getNextYearDate(),
  };
};

//date for firebase creation date
export function formatDate(dateString: string): string {
  // Split the date string into parts
  const parts = dateString.split("T")[0].split("-");

  // Convert month from numeric to abbreviation
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthAbbr = months[parseInt(parts[1], 10) - 1];

  // Formatted date string "Jul 16, 2024"
  return `${monthAbbr} ${parseInt(parts[2], 10)}, ${parts[0]}`;
}
