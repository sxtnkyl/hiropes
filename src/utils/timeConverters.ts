interface TimeConverters {
  minutesToSeconds: (minutes: number) => number;
  secondsToMinutes: (seconds: number) => number;
  minutesToHours: (minutes: number) => number;
  hoursToSeconds: (hours: number) => number;
  formattedSecondsToMinuteSeconds: (secondsToConvert: number) => {
    minutes: number;
    seconds: number;
  };
}

export const timeConverters = (): TimeConverters => {
  const minutesToSeconds = (minutes: number) => {
    return minutes * 60;
  };
  const secondsToMinutes = (seconds: number) => {
    return seconds / 60;
  };
  const minutesToHours = (minutes: number) => {
    return minutes / 60;
  };
  const hoursToSeconds = (hours: number) => {
    return hours * 60 * 60;
  };
  const formattedSecondsToMinuteSeconds = (
    secondsToConvert: number
  ): { minutes: number; seconds: number } => {
    const minutes = secondsToMinutes(secondsToConvert);
    const flatMinutes = Math.floor(minutes);
    const remainderSeconds = Math.round(
      minutesToSeconds(minutes - flatMinutes)
    );
    return { minutes: flatMinutes, seconds: remainderSeconds };
  };

  return {
    minutesToSeconds,
    secondsToMinutes,
    minutesToHours,
    hoursToSeconds,
    formattedSecondsToMinuteSeconds,
  };
};
