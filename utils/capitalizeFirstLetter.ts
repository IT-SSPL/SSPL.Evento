export const capitalizeFirstLetter = (value: string | null) => {
  return value !== null ? value.charAt(0).toUpperCase() + value.slice(1) : "";
};
