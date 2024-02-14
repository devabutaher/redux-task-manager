export function formatDate(dateString) {
  const options = { day: "numeric", month: "long" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options).split(" ").reverse();
}
