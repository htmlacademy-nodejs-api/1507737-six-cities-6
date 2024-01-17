export function toBoolean(value: boolean | string | undefined) {
  return value ? value !== 'false' : false;
}
