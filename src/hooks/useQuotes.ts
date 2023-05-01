import { useInfiniteQuery } from "@tanstack/react-query";
import { SDK_QUOTES } from "../constants/index.constant";
import {
  Character,
  Quote,
  QuoteListResponse,
  RequestOptions,
} from "@delali/lotrsdk/dist/src/interfaces";
import { getAppInfo } from "../utils/index.utils";

const getQuotes = async <T>(options?: RequestOptions): Promise<T> => {
  try {
    const url = new URL(`/api/quotes`, getAppInfo().CONFIG.CLIENT_BASE_URL);

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

interface CharacterQuotes extends QuoteListResponse {
  docs: (Quote & {
    characterlist: Character;
  })[];
}
export const useQuotes = (options?: RequestOptions) => {
  const {
    data = null,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [SDK_QUOTES],
    queryFn: async (): Promise<CharacterQuotes | null> =>
      getQuotes({ ...options, limit: 10 }),
    getNextPageParam: (page) =>
      Number(page?.page ?? 1) < Number(page?.pages ?? 0)
        ? Number(page?.page ?? 0) + 1
        : undefined,
  });

  return {
    quotes: data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
