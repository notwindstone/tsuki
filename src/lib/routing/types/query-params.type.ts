/**
 * URL query parameters. Besides string, also accepts number, null and
 * undefined.
 *
 * @example
 * const params = {
 *   name: 'Joe',
 *   age: 43,
 * };
 */
export type QueryParams = Record<string, string | number | null | undefined>;
