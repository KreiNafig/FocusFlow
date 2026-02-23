import { configureStore } from "@reduxjs/toolkit";
import { randomQuote } from "./api/RandomQuote/randomQuote";
import { randomPhoto } from "./api/RandomPhoto/randomPhoto";
import { randomProfile } from "./api/RandomProfile/randomProfile";


export const store = configureStore({
    reducer: {
        [randomQuote.reducerPath]: randomQuote.reducer,
        [randomPhoto.reducerPath]: randomPhoto.reducer,
        [randomProfile.reducerPath]: randomProfile.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(randomQuote.middleware).concat(randomPhoto.middleware).concat(randomProfile.middleware)
});