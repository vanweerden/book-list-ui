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

// Returns today's date in format YYYY-MM-DD
export function today() {
  var today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  return today;
}
