const localTimeOptions: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
};

// Timestamp converter
export const formatTimestamp = (timestamp: number | string) => {
  // If timestamp is a number (unix timestamp in milliseconds)
  if (typeof timestamp === "number") {
    const date = new Date(timestamp);

    return date.toLocaleTimeString("fi-FI", localTimeOptions);
  }

  // If timestamp is a string ISO
  if (typeof timestamp === "string") {
    const date = new Date(timestamp);

    if (!isNaN(date.getTime())) {
      return date.toLocaleTimeString("en-FI", localTimeOptions);
    }
    return timestamp; // Return original if not converted
  }

  return timestamp; // Return original if not a number or string
};
