export const objTranslateUrl = (obj: Record<string, unknown>): string =>
  obj
    ? Object.entries(obj)
        .map((item) => item.join('='))
        .join('&')
    : ''

export const queryString = <T extends Record<string, unknown>>(
  search = window.location.search
) =>
  search
    .substr(1)
    .split('&')
    .map((item) => item.split('='))
    .map(([key, value]) => [key, decodeURIComponent(value)])
    .reduce((res, [key, value]) => ({ ...res, [key]: value }), {} as T)
