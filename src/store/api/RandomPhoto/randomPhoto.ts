import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const randomPhoto = createApi({
    reducerPath: 'randomPhoto',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1'}),
    endpoints: (build) => ({
        getPhotoCat: build.query({
            query: () => ``,
        }),
    })
})

export const {useGetPhotoCatQuery} = randomPhoto