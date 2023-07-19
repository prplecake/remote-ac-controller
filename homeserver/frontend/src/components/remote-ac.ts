export function convertToFahrenheit(temp_c: number) {
  return (temp_c * (9 / 5) + 32).toFixed(1);
}

export const minuteInMiliseconds = 60000;

// https://gist.github.com/mohokh67/e0c5035816f5a88d6133b085361ad15b
export function formatDate(d: Date) {
  try {
    const date = d.toISOString().split("T")[0];
    const time = d.toTimeString().split(" ")[0];
    return `${date} ${time}`;
  } catch (error) {
    if (error instanceof RangeError) {
      console.debug("could not format date: " + d);
    }
    return undefined;
  }
}
