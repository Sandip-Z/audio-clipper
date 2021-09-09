class TimeSlotServiceClass {
  GenerateIdForTimeSlot() {
    return (Math.random() + 1).toString(36).substring(7);
  }

  GetHoursFromSeconds = (seconds) => {
    return Math.trunc(seconds / 60 / 60);
  };

  GetMinutesFromSeconds = (seconds) => {
    return Math.trunc((seconds / 60) % 60);
  };

  GetLeftOverSecondsFromSeconds = (seconds) => {
    return Math.trunc(seconds % 60);
  };

  GetChangedTimeToUpdateTimeFromInputs = ({ type, value, seconds }) => {
    const currentHour = this.GetHoursFromSeconds(seconds);
    const currentMinute = this.GetMinutesFromSeconds(seconds);
    const currentSecond = this.GetLeftOverSecondsFromSeconds(seconds);
    switch (type) {
      case "hour":
        return value * 60 * 60 + currentMinute * 60 + currentSecond;
      case "minute":
        return currentHour * 60 * 60 + value * 60 + currentSecond;
      case "second":
        return currentHour * 60 * 60 + currentMinute * 60 + value;
      default:
        return currentHour + currentMinute + currentSecond;
    }
  };
}

const TimeSlotService = new TimeSlotServiceClass();
export { TimeSlotService };
