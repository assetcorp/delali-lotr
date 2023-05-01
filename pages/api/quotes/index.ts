import { NextApiRequest, NextApiResponse } from "next";
import { runCors, setDefaultResponse } from "@/server/utils/server.util";
import { getQuotes } from "@/server/controllers/sdk.controller";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  await runCors(req, res);

  switch (method) {
    case "GET":
      return getQuotes(req, res);
    default:
      return setDefaultResponse(res);
  }
};
