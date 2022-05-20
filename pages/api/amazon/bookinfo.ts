import { NextApiRequest, NextApiResponse } from "next";

import { getBookInfo } from './_scrap'

let baseUrl = 'https://www.amazon.com.br/dp/'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { book_code } = req.query

    if (!book_code || !book_code.length) {
        res.json([])
        return
    }

    const html = await fetch(`${baseUrl}${book_code}`).then(r => r.text())

    const result = getBookInfo(html)

    res.json(result)
}