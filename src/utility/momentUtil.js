import moment from "moment";

/* *
Moment service to  do common coversion in app
*/
export const MomentService = {
  //  Convert HH:MM format to hours and minutes
  convertHoursFormat(startTime, endTime) {
    let sTime = moment(startTime, "HH:mm");
    let eTime = moment(endTime, "HH:mm");
    let duration = moment.duration(eTime.diff(sTime));
    let hours = parseInt(duration.asHours());
    let minutes = parseInt(duration.asMinutes()) - hours * 60;
    return `${hours} Hr ${minutes} min`;
  },

  //  Check if Departure Time is minimum 30 minutes after the first flight's arrival time
  checkTimeDifference(startTime, endTime) {
    return (
      (
        moment.duration(startTime).asHours() -
        moment.duration(endTime).asHours()
      ).toFixed(2) >= 0.5
    );
  },

  // Format a date to Day, Date Month format
  formatDate(date) {
    return moment(date).format("ddd Do MMMM");
  },

  // Format a date to YYYY/MM/DD format to do equality check
  defaultDateFormat(date) {
    return moment(date).format("YYYY/MM/DD");
  },

  // Subtract 1 Day
  subtractDays(number) {
    return moment().subtract(number, "day");
  }
};
