import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const randomQuote = createApi({
    reducerPath: 'randomQuote',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://official-joke-api.appspot.com/random_joke' }),
    endpoints: (build) => ({
      getQuoteJokes: build.query({
        query: () => ``,
      }),
    }),
  })

export const {useGetQuoteJokesQuery} = randomQuote;