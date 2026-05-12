export function getTodayString() {
  const todayDate = Date.now();
  const todayString = new Date(todayDate).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return todayString;
}
