// Decode colons replaced by the browser

const COLON_STRING = "%3A";

export const decode = (dateString: string) => {
  return new Date(dateString.replaceAll(COLON_STRING, ":"));
};

export const encode = (date: Date) => {
  return date.toISOString().replaceAll(":", COLON_STRING);
};
