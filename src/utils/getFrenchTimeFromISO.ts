/**
 * Returns a string with the time in French format from an ISO date
 * @param date - The date in ISO format.
 * @returns The time in a readable string.
 */
const getFrenchTimeFromISO = (date: string): string => {
  const dateObject = new Date(date);
  return dateObject.toLocaleTimeString("fr-FR").slice(0, 5);
};

export default getFrenchTimeFromISO;
