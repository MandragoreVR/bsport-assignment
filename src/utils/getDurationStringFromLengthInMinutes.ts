/**
 * This function returns a string with the duration of the activity in hours and minutes.
 * @param lengthInMinutes - The duration of the activity in minutes.
 * @returns The duration in a readable string.
 */
const getDurationStringFromLengthInMinutes = (lengthInMinutes?: number) => {
  if (!lengthInMinutes) return "";
  const hours = Math.floor(lengthInMinutes / 60);
  const minutes = lengthInMinutes % 60;

  if (hours === 0) return `${minutes}min`;
  return `${hours}h${minutes > 0 ? minutes : ""}`;
};

export default getDurationStringFromLengthInMinutes;
