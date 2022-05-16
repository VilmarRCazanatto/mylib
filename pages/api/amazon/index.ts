import { NextApiRequest, NextApiResponse } from "next";

import cheerioScrap from './_scrap'

let baseUrl = 'https://www.amazon.com.br'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { search_text } = req.query

    const html = await fetch(`${baseUrl}/s?k=${search_text}&i=stripbooks&page=1`).then(r => r.text())

    res.json(cheerioScrap(html))
}