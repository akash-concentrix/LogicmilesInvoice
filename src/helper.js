export function formatIndianPrice(number) {
  // Convert the number to a string to manipulate it
  let numStr = number.toString();
  let lastThree = numStr.substring(numStr.length - 3);
  let otherNumbers = numStr.substring(0, numStr.length - 3);
  if (otherNumbers !== "") {
    lastThree = "," + lastThree;
  }
  // Apply the Indian numbering system
  let result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  return "₹" + result;
}

export function formatDate() {
  // Array of month names in abbreviated form
  const monthNames = [
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

  // Get the day, month, and year from the date object
  let date = new Date();
  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();

  // Add leading zero to the day if it is a single digit
  if (day < 10) {
    day = "0" + day;
  }

  // Get the month abbreviation
  let monthName = monthNames[monthIndex];

  // Combine the parts into the desired format
  return `${day}-${monthName}-${year}`;
}
