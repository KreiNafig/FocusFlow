import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const randomProfile = createApi({
    reducerPath: 'randomProfile',
    baseQuery: fetchBaseQuery({baseUrl: 'https://randomuser.me//api'}),
    endpoints: (build) => ({
        getProfileUser: build.query({
            query: () => ``,
        }),
    })
})

export const { useGetProfileUserQuery } = randomProfile;