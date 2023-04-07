export const UTCTimePrinter = (time: string) => {
    const timestamp = Date.UTC(
      new Date(time).getUTCFullYear(),
      new Date(time).getUTCMonth(),
      new Date(time).getUTCDate(),
      new Date(time).getUTCHours(),
      new Date(time).getUTCMinutes(),
      new Date(time).getUTCSeconds(),
      new Date(time).getUTCMilliseconds()
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