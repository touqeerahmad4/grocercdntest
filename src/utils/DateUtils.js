import * as dayjs from "dayjs";

const diffFromToday = date => {
  return date.startOf("day").diff(dayjs().startOf("day"), "days");
};

const isToday = date => {
  return diffFromToday(date) === 0;
};

const isTomorrow = date => {
  return diffFromToday(date) === 1;
};

const dayjsDate = date => {
  return dayjs(date);
};

export const weekDay = date => {
  const paramDate = dayjsDate(date);
  if (isToday(paramDate)) {
    return "Today";
  }
  if (isTomorrow(paramDate)) {
    return "Tomorrow";
  }
  return paramDate.format("ddd");
};

export const dayMonth = date => {
  return dayjsDate(date).format("D MMM");
};

export const getDeliveryTime = (start, end) => {
  const startTime = dayjsDate(start).format("h:mm a");
  const endTime = dayjsDate(end).format("h:mm a");
  return `${startTime} - ${endTime}`;
};

export const readableDate = date => {
  // return dayjsDate(date).format("ddd, Do MMM YYYY");
  return dayjsDate(date).format("ddd, D MMM YYYY");
};

export const readableTime = date => {
  return dayjsDate(date).format("h:mm a");
};

export function isSameOrAfterNow(date) {
  return new Date() <= new Date(date);
}

// export const isSameOrAfterNow = date => {
//   console.log(date);
//   return dayjs(new Date()).isSameOrAfter(date, "year");
// };

// export const isSameOrAfterNowM = date => {
//   return moment(date).isSameOrAfter(moment());
// };
