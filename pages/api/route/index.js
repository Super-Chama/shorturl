import { nanoid } from "nanoid";
import prisma from "../../../lib/prisma";

// POST /api/route
export default async function handle(req, res) {
  if (req.method === "POST") {
    const { url } = req.body;
    const result = await prisma.route.create({
      data: {
        url: url,
        hash: nanoid(10),
      },
    });
    res.json({ ...result, host: req.headers.host });
  } else {
    res.status(404).send();
  }
}
