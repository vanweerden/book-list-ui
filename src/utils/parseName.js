// Splits string n of format 'firstname lastname' and returns first or last (fl)
export function parseName(name, firstOrLast) {
  let [first, last] = name.split(' ');
  return firstOrLast === 'last' ? last : first;
}
