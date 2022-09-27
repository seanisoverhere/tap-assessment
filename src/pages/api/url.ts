import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

const generateUUID = () => {
  // Public Domain/MIT
  var d = new Date().getTime();
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0;
  // 16^7 / 2^28
  return "xxxx-4xxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

type Data = {
  data?: string;
  message: string;
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    return await createUrl(req, res);
  } else if (req.method === "GET") {
    return await getUrl(req, res);
  }

  return res
    .status(405)
    .json({ message: "Method not allowed", success: false });
}

const getUrl = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { url } = req.query;

  try {
    const data = await prisma.url.findFirst({
      where: {
        convertedUrl: url as string,
      },
    });

    if (!data) {
      return res.status(404).json({
        message: "URL not found",
        success: false,
      });
    }

    return res.status(200).json({
      data: data.originalUrl,
      message: "Successfully retrieved URL",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

const createUrl = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { url, alias } = req.body;

  const convertedUrl = `${alias}_${generateUUID()}`;

  try {
    await prisma.url.create({
      data: {
        originalUrl: url,
        convertedUrl,
        expireAt: new Date(Date.now() + 86400000),
      },
    });

    return res.status(200).json({
      data: convertedUrl,
      message: "Successfully created URL",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
