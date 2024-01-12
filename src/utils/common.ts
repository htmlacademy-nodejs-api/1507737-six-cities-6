export function toBoolean(value: unknown): boolean {
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'number') {
    return value !== 0;
  }

  if (typeof value === 'string') {
    const lowercasedValue = value.trim().toLowerCase();
    return lowercasedValue === 'true' || lowercasedValue === '1';
  }

  if (value instanceof Date) {
    return !Number.isNaN(value.getTime());
  }

  return false;
}
