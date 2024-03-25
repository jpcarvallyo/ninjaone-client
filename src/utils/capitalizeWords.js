/**
 * Capitalizes the first letter of each word in a string.
 *
 * @param {string} str - The input string to capitalize.
 * @returns {string} - The string with the first letter of each word capitalized.
 */
export function capitalizeWords(str) {
  // Check if the input string contains multiple words separated by spaces
  if (/\s/.test(str)) {
    // If the input contains multiple words, capitalize the first letter of each word
    const output = str.replace(/\b\w/g, (char) => char.toUpperCase());
    return output;
  } else {
    // If the input is a single word, capitalize the first letter only
    const output = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    return output;
  }
}
