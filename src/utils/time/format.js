export const format_time = (str) => {
  const a = new Date(str.slice(0, str.length - 3)).toLocaleDateString()
  const b = new Date(str.slice(0, str.length - 3)).toLocaleTimeString()

  return a + b
}
