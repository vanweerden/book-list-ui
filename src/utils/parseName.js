// Splits string n of format 'firstname lastname' and returns first or last (fl)
export function parseName(n, fl) {
  let [first, last] = n.split(' ');
  return fl == 'last' ? last : first;
}
