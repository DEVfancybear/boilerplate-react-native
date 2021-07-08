import dayjs, {Dayjs as ConfigType} from 'dayjs';

export function sameMonth(a: ConfigType, b: ConfigType) {
  return (
    a.toDate().getFullYear() === b.toDate().getFullYear() &&
    a.toDate().getMonth() === b.toDate().getMonth()
  );
}

export function sameDate(a: ConfigType, b: ConfigType) {
  return (
    a.toDate().getFullYear() === b.toDate().getFullYear() &&
    a.toDate().getMonth() === b.toDate().getMonth() &&
    a.toDate().getDate() === b.toDate().getDate()
  );
}

// greater than equal
function isGTE(a: ConfigType, b: ConfigType) {
  return a.diff(b, 'day') > -1;
}

// less than equal
function isLTE(a: ConfigType, b: ConfigType) {
  return b.diff(a, 'day') > -1;
}

//
function daysFromTo(a: ConfigType | Date, b: ConfigType | Date) {
  const days = [];
  // convert moment to time. moment().getTime()
  let localFrom = +a;
  const localTo = +b;

  for (
    ;
    localFrom <= localTo;
    localFrom = dayjs(localFrom).add(1, 'day').toDate().getTime()
  ) {
    days.push(dayjs(localFrom));
  }

  return days;
}

function daysInMonth(_date: string | Date | ConfigType | number) {
  const date = dayjs(_date).toDate();
  const year = date.getFullYear();
  const month = date.getMonth();
  const days = new Date(year, month + 1, 0).getDate();

  const firstDay = new Date(year, month, 1, 0, 0, 0);
  const lastDay = new Date(year, month, days, 0, 0, 0);

  return daysFromTo(firstDay, lastDay);
}

export function getDaysByMonth(
  mDate: string | Date | ConfigType | number,
  firstDayOfWeek: number,
  showSixWeeks?: boolean,
) {
  const days = daysInMonth(mDate);
  let before: ConfigType[] = [];
  let after: ConfigType[] = [];
  // caculate first day of week(ex: firstDayOfWeek > 7)
  const fdow = (7 + firstDayOfWeek) % 7 || 7;
  // caculate last day of week by first day of week
  const ldow = (fdow + 6) % 7;
  const from = dayjs(days[0]);
  const daysBefore = from.day();

  if (from.day() !== fdow) {
    // subtract if current date not equals first day of week
    from.add(-(from.day() + 7 - fdow) % 7, 'day');
  }

  const to = dayjs(days[days.length - 1]);
  const day = to.day();

  if (day !== ldow) {
    // add if laste date not equals last day of week
    to.add((ldow + 7 - day) % 7, 'day');
  }

  const daysForSixWeeks = (daysBefore + days.length) / 6 >= 6;

  // check size days pluss days before divide 6 enough or not 6 weeks
  if (showSixWeeks && !daysForSixWeeks) {
    to.add(7, 'day');
  }

  if (isLTE(from, dayjs(days[0]))) {
    before = daysFromTo(from, days[0]);
  }

  if (isGTE(to, days[days.length - 1])) {
    after = daysFromTo(days[days.length - 1], to);
  }

  const latest = before.concat(days.slice(1, days.length - 1), after);

  return latest;
}
