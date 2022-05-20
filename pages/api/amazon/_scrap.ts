import * as cheerio from 'cheerio'

type SearchBook = {
    title: string,
    author: string,
    img: string,
    release: number,
    code: string,
}
type InfoBook = {
    sinopse: string[],
    pages: number,
    rate: number,
}

const getSearch = (html: string): SearchBook[] => {
    let $r = cheerio.load(html)

    let itens = $r('div.s-result-item > div.sg-col-inner')

    return itens.map((i, el) => {

        let code = $r(el).parent().attr('data-asin')

        let $ = cheerio.load(el)

        let img = $('img.s-image').attr('src')
        if (img) img = img
            .split('/I/')[1]
            .split('._AC')[0]

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

        return { title, img, author, release, code }
    }).get() as SearchBook[]
}

const getBookInfo = (html: string): InfoBook => {
    const $ = cheerio.load(html)

    let sinopse = $('div#bookDescription_feature_div p').map((i, el) => {
        return $(el).text()
    }).get()
        .filter(s => s.length > 0)

    

    if (!sinopse.length) {
        sinopse = $('div#bookDescription_feature_div span').map((i, el) => {
            return $(el).text()
        }).get()
            .filter(s => s.length > 0)
    }




    const pages = $('div#detailBulletsWrapper_feature_div span').map((i, el) => {
        let span = $(el).text()

        if (span.indexOf(' páginas') == -1 || span.indexOf(':') > -1) return -1
        span = span.split(' páginas')[0]
        let page_count = Number(span)


        return Number.isInteger(page_count) ? page_count : -1
    }).get()
        .reduce((pages, n) => n > -1 ? n : pages, -1)


    const rate = Number.parseFloat(
        $($('#acrPopover span.a-icon-alt')[1])
            .text().split(' de')[0].split(',').join('.')
    )



    return { sinopse, pages, rate }
}

export {
    getSearch,
    getBookInfo,
}