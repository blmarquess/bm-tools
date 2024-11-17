export const snakeToCamelCase = <T extends Record<string, any>>(obj: T): any => {
  if (Array.isArray(obj)) {
    return obj.map(snakeToCamelCase)
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()),
        snakeToCamelCase(value),
      ]),
    )
  }
  return obj
}
