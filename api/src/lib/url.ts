export const LIST_CAFE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8912'
    : process.env.APP_URL || 'https://list-cafe.vercel.app'

export const mapUrlsToRegex = (urls: string[]) =>
  new RegExp(
    `(https?:\/\/)?(www\.)?(${urls
      .map((url) => url.replaceAll('.', '\\.'))
      .join('|')})`
  )
