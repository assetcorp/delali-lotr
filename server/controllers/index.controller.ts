import LOTRSDK from "@delali/lotrsdk";
import { RequestOptions } from "@delali/lotrsdk/dist/src/interfaces";
import { NextApiRequest } from "next";

// We cache the sdk initialisation so that we can reuse it incase
// this application is deployed to a FaaS system
const globalAny: any = global;
globalAny.cachedSDK = null;

export const getLOTRSDK = (): LOTRSDK => {
  if (globalAny.cachedSDK) {
    return globalAny.cachedSDK;
  } else {
    const apiKey = process.env.LOTR_API_KEY;
    globalAny.cachedSDK = new LOTRSDK(apiKey!);

    return globalAny.cachedSDK;
  }
};

export const createSDKOptions = (req: NextApiRequest): RequestOptions => {
  const { limit, page, offset, sort } = req.query;
  const options: RequestOptions = {};
  if (limit) options.limit = Number(limit ?? 10);
  if (page) options.page = Number(page ?? 1);
  if (offset) options.offset = Number(offset ?? 0);
  if (sort) options.sort = sort as string;

  return options;
};
