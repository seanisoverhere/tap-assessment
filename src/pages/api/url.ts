import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getURL } from "next/dist/shared/lib/utils";

const md5 = require("blueimp-md5");

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

  console.log(url)

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
  const { url } = req.body;
  const convertedUrl = md5(url);

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
