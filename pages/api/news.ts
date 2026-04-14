import type { NextApiRequest, NextApiResponse } from "next";

const API_URL =
    "http://1e14c3489fcb.vps.myjino.ru:5000/api/v1/news/feed/company/short";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        page = "1",
        perPage = "3",
    } = req.query;

    try {
        const response = await fetch(
            `${API_URL}?perPage=${perPage}&page=${page}`
        );

        if (!response.ok) {
            return res.status(response.status).json({
                message: "Failed to fetch news",
            });
        }

        const data = await response.json();

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}
