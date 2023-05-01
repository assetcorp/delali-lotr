import { getAppInfo } from "@/src/utils/index.utils";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

export const isLocalNetwork = (hostname: string) => {
  return (
    hostname.startsWith("localhost") ||
    hostname.startsWith("127.0.0.1") ||
    hostname.startsWith("192.168.") ||
    hostname.startsWith("10.0.") ||
    hostname.endsWith(".local")
  );
};

export const getAbsoluteUrl = (
  req?: NextApiRequest,
  fallback = "localhost:3000"
) => {
  let host =
    (req?.headers ? req.headers.host : window.location.host) || fallback;
  let protocol = isLocalNetwork(host) ? "http:" : "https:";

  if (
    req &&
    req.headers["x-forwarded-host"] &&
    typeof req.headers["x-forwarded-host"] === "string"
  ) {
    host = req.headers["x-forwarded-host"];
  }

  if (
    req &&
    req.headers["x-forwarded-proto"] &&
    typeof req.headers["x-forwarded-proto"] === "string"
  ) {
    protocol = `${req.headers["x-forwarded-proto"]}:`;
  }

  return {
    protocol,
    host,
    origin: protocol + "//" + host,
  };
};

export const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: any
) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
};

export const runCors = async (req: NextApiRequest, res: NextApiResponse) => {
  let WHITELIST_DOMAINS = "";
  const host = getAbsoluteUrl(req, "delalify.com").host;
  const appConfig = getAppInfo(host);
  WHITELIST_DOMAINS = appConfig.CONFIG.WHITELIST_DOMAINS;

  const cors = Cors({
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"],
    origin: (origin: any, callback) => {
      if (WHITELIST_DOMAINS.includes(host)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed"));
      }
    },
  });

  await runMiddleware(req, res, cors);
};

export const setDefaultResponse = (
  res: NextApiResponse,
  code = 405,
  message = "We cannot process this request"
) => {
  return res.status(code).send(message);
};
