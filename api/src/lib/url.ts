export const LIST_CAFE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8912'
    : 'https://www.list.cafe'

export const mapUrlsToRegex = (urls: string[]) =>
  new RegExp(
    `(https?:\/\/)?(www\.)?(${urls
      .map((url) => url.replaceAll('.', '\\.'))
      .join('|')})`
  )
