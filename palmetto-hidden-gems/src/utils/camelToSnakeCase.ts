/**
 * Converts a camelCase string to snake_case.
 * @param str - The camelCase string to convert.
 * @returns The converted snake_case string.
 */
export function toSnakeCase(str: string): string {
  return str.replace(/([A-Z])/g, (letter) => `_${letter.toLowerCase()}`);
}

/**
 * Recursively converts all keys of an object from camelCase to snake_case.
 * @param obj - The input object with camelCase keys.
 * @returns A new object with snake_case keys.
 */
export function camelToSnake<T>(obj: T): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => camelToSnake(item));
  } else if (obj !== null && typeof obj === "object") {
    return Object.entries(obj).reduce(
      (accumulator, [key, value]) => {
        const snakeKey = toSnakeCase(key);
        accumulator[snakeKey] = camelToSnake(value);
        return accumulator;
      },
      {} as Record<string, any>
    );
  }
  return obj;
}
