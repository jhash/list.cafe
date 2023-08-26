import axios from 'axios'

import { LIST_CAFE_URL } from 'src/constants/urls'

export const api = axios.create({
  baseURL: `${LIST_CAFE_URL}/api`,
})
