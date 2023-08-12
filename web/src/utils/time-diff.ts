export default function timeDiff(date1: Date | null, date2: number) {
  if (date1) {
    const diff = date1.getTime() - date2;
    return Math.abs(diff) / 1000;
  }
  return false;
}
