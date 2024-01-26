export function toBoolean(value: boolean | string | undefined) {
  return value ? value !== 'false' : false;
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}
