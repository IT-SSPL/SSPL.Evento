export const emptyIfNull = (value: string | null) => {
  return value !== null ? value : "";
};
