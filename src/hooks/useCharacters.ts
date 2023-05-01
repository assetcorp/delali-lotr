import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { SDK_CHARACTERS } from "../constants/index.constant";
import {
  CharacterListResponse,
  RequestOptions,
} from "@delali/lotrsdk/dist/src/interfaces";
import { getAppInfo } from "../utils/index.utils";

const getCharacters = async <T>(options?: RequestOptions): Promise<T> => {
  try {
    const url = new URL(`/api/characters`, getAppInfo().CONFIG.CLIENT_BASE_URL);

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

export const useCharacters = (options?: RequestOptions) => {
  const {
    data = null,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [SDK_CHARACTERS],
    queryFn: async (): Promise<CharacterListResponse | null> =>
      getCharacters({ ...options, limit: 10 }),
    getNextPageParam: (page) =>
      Number(page?.page ?? 1) < Number(page?.pages ?? 0)
        ? Number(page?.page ?? 0) + 1
        : undefined,
  });

  return {
    characters: data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
