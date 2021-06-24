class TimeConvert {
  padZero = (num: number, size: number) => {
    let s = String(num);
    while (s.length < size) {
      s = `0${s}`;
    }
    return s;
  };
  // convert to format: 00:00

  timeConvert = (num: number) => {
    const minutes = this.padZero(Math.floor(num / 1000 / 60), 2);
    const seconds = this.padZero(num % 60, 2);
    return `${minutes}:${seconds}`;
  };
  secondToTime = (num: number) => {
    const minutes = this.padZero(Math.floor(num / 60), 2);
    const seconds = this.padZero(num % 60, 2);
    return `${minutes}:${seconds}`;
  };
}

const timeConvert = new TimeConvert();

export default timeConvert;
