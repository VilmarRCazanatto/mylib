import * as cheerio from 'cheerio'

type SearchBooks = {
    title: string,
    author: string,
    img: string,
    release: number,
}

export default (html: string) => {
    let $ = cheerio.load(html)

    let itens = $('div.s-result-item > div.sg-col-inner')

    return itens.map((i, el) => {
        let $ = cheerio.load(el)

        let img = $('img.s-image').attr('src')

        let title = $('h2 > a > span').text()

        const spans = $('div.a-row > span.a-size-base').map((j, span) => $(span).text()).get()

        const { author, release } = spans.reduce((data, span) => {
            if (data.isAuthor) {
                data.author = span
                data.isAuthor = false
            }

            if (data.isRelease) {
                data.release = Number(span.split(' ')[2])
                data.isRelease = false
            }

            if (span == "por ") data.isAuthor = true
            if (data.author.length && span == " | ") data.isRelease = true

            return data
        }, { author: "", isAuthor: false, release: 0, isRelease: false })

        return { title, img, author, release }
    }).get()
}