// src/services/utils/stringUtils.ts

/**
 * Strips leading, trailing, and multiple spaces in a string.
 * @param {string} input - The string to process.
 * @return {string} The processed string without extra spaces.
 */
export const stripSpaces = (input: string): string => {
    return input.replace(/\s+/g, '').trim();
  };
  