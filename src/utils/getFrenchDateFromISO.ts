/**
 * This function capitalizes the first letter of a string.
 * @param string - The string to capitalize.
 * @returns The string with the first letter capitalized.
 */
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * This function returns a string with the date in French and in plain text.
 * @param date - The date in ISO format.
 * @returns The date in a readable string.
 */
const getFrenchDateFromISO = (date: string) => {
  const dateObject = new Date(date);
  const dateOptions: {
    day: "numeric";
    month: "long";
    weekday: "long";
    year: "numeric";
  } = {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
  };
  const partsOfDate = dateObject
    .toLocaleDateString("fr-FR", dateOptions)
    .split(" ");
  return `${capitalizeFirstLetter(partsOfDate[0])} ${
    partsOfDate[1]
  } ${capitalizeFirstLetter(partsOfDate[2])} ${partsOfDate[3]}`;
};

export default getFrenchDateFromISO;
