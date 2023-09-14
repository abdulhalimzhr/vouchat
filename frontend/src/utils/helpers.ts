export const formatTimeOrDate = function (inputDate: Date): string {
  const now = new Date();
  const timeDifference = now.getTime() - inputDate.getTime();
  const oneHour = 60 * 60 * 1000;
  const oneDay = 24 * oneHour;
  const threeDays = 3 * oneDay;

  if (timeDifference < oneHour && now.getDate() === inputDate.getDate()) {
    const minutesAgo = Math.floor(timeDifference / (60 * 1000));
    return `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`;
  } else if (timeDifference < oneDay && now.getDate() === inputDate.getDate()) {
    const hoursAgo = Math.floor(timeDifference / oneHour);
    return `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`;
  } else if (timeDifference < threeDays) {
    const daysAgo = Math.floor(timeDifference / oneDay);
    return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`;
  } else {
    return inputDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};
