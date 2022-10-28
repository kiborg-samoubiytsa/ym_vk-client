export const durationToMinutes = (duration: number) => {
  const seconds = new Date(duration);
  if (seconds.getSeconds() < 10 && duration >= 0) {
    return `${seconds.getMinutes()}:0${seconds.getSeconds()}`;
  }
  if (duration < 0) {
    return "0:00";
  } else return `${seconds.getMinutes()}:${seconds.getSeconds()}`;
};
