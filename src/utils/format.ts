export function formatDemonstrativeValue(value: string) {
  return value.endsWith('*') ? value : `${value}*`;
}
