export const camelToSnakeCase = <T extends Record<string, any>>(obj: T): any => {
  if (Array.isArray(obj)) {
    return obj.map(camelToSnakeCase)
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key.replace(/([A-Z])/g, '_$1').toLowerCase(),
        camelToSnakeCase(value),
      ]),
    )
  }
  return obj
}
