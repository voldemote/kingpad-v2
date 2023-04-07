export const UTCTimePrinter = (time: string) => {
    const timestamp = Date.UTC(
      new Date(time + "Z").getUTCFullYear(),
      new Date(time + "Z").getUTCMonth(),
      new Date(time + "Z").getUTCDate(),
      new Date(time + "Z").getUTCHours(),
      new Date(time + "Z").getUTCMinutes(),
      new Date(time + "Z").getUTCSeconds(),
      new Date(time + "Z").getUTCMilliseconds()
    );
    return timestamp;
}

export const currentTimeStamp = () => {
     const now = Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate(),
      new Date().getUTCHours(),
      new Date().getUTCMinutes(),
      new Date().getUTCSeconds(),
      new Date().getUTCMilliseconds()
    );
    return now;
}