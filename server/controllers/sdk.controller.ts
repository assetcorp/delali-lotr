import { NextApiRequest, NextApiResponse } from "next";
import { setDefaultResponse } from "../utils/server.util";
import { createSDKOptions, getLOTRSDK } from "./index.controller";

export const getMovies = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const options = createSDKOptions(req);
    const response = await getLOTRSDK().getMovies(options);
    if (!response) throw response;

    return res.status(200).json(response);
  } catch (error) {
    return setDefaultResponse(res);
  }
};

export const getMovieDetails = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { movieId } = req.query;
    // Get movie
    const movie = await getLOTRSDK().getMovieById(movieId as string);
    if (!movie) throw movie;

    // Get movie quotes
    const quotes = await getLOTRSDK().getMovieQuotes(movieId as string, {
      limit: 10,
    });

    const response = {
      movie: movie.docs[0],
      quotes: quotes ? quotes.docs : [],
    };

    return res.status(200).json(response);
  } catch (error) {
    return setDefaultResponse(res);
  }
};

export const getCharacters = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const options = createSDKOptions(req);
    const response = await getLOTRSDK().getCharacters(options);
    if (!response) throw response;

    return res.status(200).json(response);
  } catch (error) {
    return setDefaultResponse(res);
  }
};

export const getQuotes = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const options = createSDKOptions(req);

    // Get quotes
    const quotes = await getLOTRSDK().getQuotes(options);
    if (!quotes) throw quotes;

    // For each quote, get the character details
    const characterQuotes = await Promise.all(
      (quotes.docs ?? []).map((item) => {
        return getLOTRSDK().getCharacterById(item.character);
      })
    );

    const quoteDocs = quotes.docs.map((item, index) => {
      return {
        ...item,
        characterlist: characterQuotes[index].docs[0],
      };
    });

    quotes.docs = quoteDocs;

    return res.status(200).json(quotes);
  } catch (error) {
    return setDefaultResponse(res);
  }
};
