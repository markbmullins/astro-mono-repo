/**
 * Converts a snake_case string to camelCase.
 * @param str - The snake_case string to convert.
 * @returns The converted camelCase string.
 */
export function toCamelCase(str: string): string {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  }
  
  /**
   * Recursively converts all keys of an object from snake_case to camelCase.
   * @param obj - The input object with snake_case keys.
   * @returns A new object with camelCase keys.
   */
  export function snakeToCamel<T>(obj: T): any {
    if (Array.isArray(obj)) {
      return obj.map((item) => snakeToCamel(item));
    } else if (obj !== null && typeof obj === "object") {
      return Object.entries(obj).reduce(
        (accumulator, [key, value]) => {
          const camelKey = toCamelCase(key);
          accumulator[camelKey] = snakeToCamel(value);
          return accumulator;
        },
        {} as Record<string, any>
      );
    }
    return obj;
  }
  