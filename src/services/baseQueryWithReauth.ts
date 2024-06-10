import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.themoviedb.org',
  // credentials: 'include',
  headers: {
    accept: 'application/json',
    authorization: 'bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjA1ODJhZTljYmNmZGQ0YTgxOGE0M2I1ZjM2M2NkMyIsInN1YiI6IjY2NDRkMjlkMTg0YTQ2MzE3MjkxOWU1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jbvDD56W1Xovksdw7byjaJmb2EbjDIciNpgMK-pV_R0'

  }
})

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      // try to get a new token
      const refreshResult = await baseQuery(
        { method: 'POST', url: '/v1/auth/refresh-token' },
        api,
        extraOptions
      )

      if (refreshResult.meta?.response?.status === 204) {
        // retry the initial query
        result = await baseQuery(args, api, extraOptions)
      }
      release()
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}

// https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#automatic-re-authorization-by-extending-fetchbasequery
