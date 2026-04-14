import type { NextApiRequest, NextApiResponse } from "next";

const API_URL =
    "http://1e14c3489fcb.vps.myjino.ru:5000/api/v1/news/feed/company/short";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { page = 1 } = req.query;

    const response = await fetch(
        `${API_URL}?perPage=3&page=${page}`
    );

    const data = await response.json();

    res.status(200).json(data);
}
