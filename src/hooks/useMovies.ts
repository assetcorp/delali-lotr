import { useQuery } from "@tanstack/react-query";
import { SDK_MOVIES } from "../constants/index.constant";
import {
  Movie,
  MovieListResponse,
  Quote,
  RequestOptions,
} from "@delali/lotrsdk/dist/src/interfaces";
import { getAppInfo } from "../utils/index.utils";

interface MovieDetails {
  movie: Movie;
  quotes: Quote[];
}

const getMovies = async <T>(options?: RequestOptions): Promise<T> => {
  try {
    const url = new URL(`/api/movies`, getAppInfo().CONFIG.CLIENT_BASE_URL);

    if (options) {
      const { limit, page, offset, sort } = options;
      if (limit) url.searchParams.append("limit", limit.toString());
      if (page) url.searchParams.append("page", page.toString());
      if (offset) url.searchParams.append("offset", offset.toString());
      if (sort) url.searchParams.append("sort", sort);
    }
    const response = await fetch(url.toString(), {
      headers: {
        "Content-Type": `application/json`,
      },
    });

    if (!response.ok) {
      throw response;
    }

    return (await response.json()) as T;
  } catch (err) {
    return null as T;
  }
};

const getMovieDetails = async <T>(movieId: string): Promise<T> => {
  try {
    const url = new URL(
      `/api/movies/${movieId}`,
      getAppInfo().CONFIG.CLIENT_BASE_URL
    );

    const response = await fetch(url.toString(), {
      headers: {
        "Content-Type": `application/json`,
      },
    });

    if (!response.ok) {
      throw response;
    }

    return (await response.json()) as T;
  } catch (err) {
    return null as T;
  }
};

export const useMovies = (options?: RequestOptions) => {
  const { data = null, isLoading } = useQuery({
    queryKey: [SDK_MOVIES],
    queryFn: async (): Promise<MovieListResponse | null> => getMovies(options),
  });

  return {
    movies: data,
    isLoading,
  };
};

export const useMovieDetails = (movieId: string) => {
  const { data = null, isLoading } = useQuery({
    queryKey: [movieId, SDK_MOVIES],
    queryFn: async (): Promise<MovieDetails | null> => getMovieDetails(movieId),
  });

  return {
    data,
    isLoading,
  };
};
