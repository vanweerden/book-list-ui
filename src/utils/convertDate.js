// Converts date from MySQL YYYY-MM-DD to Day Month Year
export function parseDate(d) {
  // Convert to JS Date object
  let date = new Date(d);
  let day = String(date.getDate());
  let month = date.toLocaleString('default', {month: 'short'});
  let year = String(date.getFullYear());
  let dateString = day + ' ' + month + ' ' + year;
  return dateString;
}

// Takes date and encodes it into MySQL MySQL YYYY-MM-DD
export function encodeDate(d) {

}
