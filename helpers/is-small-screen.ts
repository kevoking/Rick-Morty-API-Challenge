import { isBrowser } from "./is-browser";

/**
 * check the size of user device screen to determine if it's a small screen e.g. mobile device on potrait mode
 * @returns boolean
 */
export function isSmallScreen(): boolean {
  return isBrowser() && window.innerWidth < 768;
}