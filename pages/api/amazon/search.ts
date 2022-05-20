import * as cheerio from 'cheerio'
import { NextApiRequest, NextApiResponse } from "next";

import { getSearch } from './_scrap'

let baseUrl = 'https://www.amazon.com.br/s'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { search_text } = req.query

    if (!search_text || !search_text.length) {
        res.json([])
        return
    }

    const html = await fetch(`${baseUrl}?k=${search_text}&i=stripbooks&page=1`).then(r => r.text())
    const result = getSearch(html)

    res.json(result)
}