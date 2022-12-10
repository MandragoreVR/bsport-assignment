const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getFrenchDateFromISO = (date: string) => {
  const dateObject = new Date(date);
  const dateOptions: {
    weekday: "long";
    year: "numeric";
    month: "long";
    day: "numeric";
  } = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const partsOfDate = dateObject
    .toLocaleDateString("fr-FR", dateOptions)
    .split(" ");
  return `${capitalizeFirstLetter(partsOfDate[0])} ${
    partsOfDate[1]
  } ${capitalizeFirstLetter(partsOfDate[2])} ${partsOfDate[3]}`;
};

export default getFrenchDateFromISO;
