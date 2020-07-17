export function parseDate(d) {
  // Converts date from MySQL YYYY-MM-DD to string: "Day Month Year"
  let date = new Date(d);
  let day = String(date.getDate());
  let month = date.toLocaleString('default', {month: 'short'});
  let year = String(date.getFullYear());
  let dateString = day + ' ' + month + ' ' + year;
  return dateString;
}

export function trimDate(mysqlDate) {
  // Takes MySQL date and returns YYY-MM-DD
  let date = new Date(mysqlDate);
  let dd = String(date.getDate()).padStart(2, '0');
  let mm = String(date.getMonth() + 1).padStart(2, '0');
  let yyyy = String(date.getFullYear());
  return `${yyyy}-${mm}-${dd}`;
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
