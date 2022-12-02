// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";

type Data = {
  content: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const path = JSON.parse(req.body).path as string;
  const file = fs.readFileSync(path as string, "utf8");
  res.status(200).json({ content: file });
}
