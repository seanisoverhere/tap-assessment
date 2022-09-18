import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/lib/prisma'

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
  }

  return res
    .status(405)
    .json({ message: "Method not allowed", success: false });
}

const createUrl = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { url } = req.body;
  let convertedUrl = "tesetset";

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
