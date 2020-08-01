// Splits string n of format 'firstname lastname' and returns first or last (fl)
export function parseName(name, firstOrLast) {
  if (!name) return '';
  if (!/\w/.test(name) && firstOrLast === 'first') {
    return name;
  } else if (!/\w/.test(name) && firstOrLast === 'last') {
    return '';
  }
  let [first, last] = name.split(' ');
  return firstOrLast === 'last' ? last : first;
}
