import moment, { Moment } from 'moment-timezone';
moment.tz.add("Asia/Calcutta|HMT BURT IST IST|-5R.k -6u -5u -6u|01232|-18LFR.k 1unn.k HB0 7zX0");
moment.tz.link("Asia/Calcutta|Asia/Kolkata");

export const TodayDateTime = (): number => {
  return moment().valueOf();
};
