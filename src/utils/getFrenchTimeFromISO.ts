const getFrenchTimeFromISO = (date: string): string => {
  const dateObject = new Date(date);
  return dateObject.toLocaleTimeString("fr-FR").slice(0, 5);
};

export default getFrenchTimeFromISO;
