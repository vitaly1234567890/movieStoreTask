import { baseApi } from "../baseApi.ts";
import {
  BigMovies,
  QueryMovies,
  RootBigMovies,
  RootGenres,
  RootMovies,
} from "./movies.types.ts";

const decksService = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getMovies: builder.query<RootMovies, QueryMovies | void>({
        providesTags: ["Movies"],
        query: (args) => ({
          params: args ?? undefined,
          url: `3/discover/movie`,
        }),
      }),
      getGenres: builder.query<RootGenres, { language: string }>({
        providesTags: ["Movies"],
        query: (args) => ({
          params: args,
          url: `3/genre/movie/list`,
        }),
      }),
      getBigMovies: builder.query<RootBigMovies, BigMovies>({
        providesTags: ["Movies"],
        query: ({ movie_id, ...args }) => ({
          params: args,
          url: `3/movie/${movie_id}?&append_to_response=videos`,
        }),
      }),
    };
  },
});

export const { useGetMoviesQuery, useGetGenresQuery, useGetBigMoviesQuery } =
  decksService;
