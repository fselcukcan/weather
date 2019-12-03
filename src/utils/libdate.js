export function formatDate (date) {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
  }

export function addDays (date, daysToAdd) {
    const dateObj = new Date(date);
    return dateObj.setDate(dateObj.getDate() + daysToAdd);
  };